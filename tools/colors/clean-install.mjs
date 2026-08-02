import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const root = dirname(fileURLToPath(import.meta.url))
const pkgPath = join(root, 'package.json')
const lockPath = join(root, 'package-lock.json')
const modulesDir = join(root, 'node_modules')
const badLink = join(modulesDir, 'daygrain-hub')

const packageJson = {
  name: 'daygrain-colors',
  private: true,
  version: '1.0.0',
  type: 'module',
  scripts: {
    dev: 'vite',
    build: 'tsc -b && vite build',
    lint: 'eslint .',
    preview: 'vite preview',
  },
  dependencies: {
    'lucide-react': '^1.16.0',
    react: '^19.2.6',
    'react-dom': '^19.2.6',
    'react-helmet-async': '^3.0.0',
    'react-router-dom': '^7.15.1',
  },
  devDependencies: {
    '@eslint/js': '^9.39.0',
    '@tailwindcss/vite': '^4.3.0',
    '@types/node': '^24.12.3',
    '@types/react': '^19.2.14',
    '@types/react-dom': '^19.2.3',
    '@vitejs/plugin-react': '^6.0.1',
    eslint: '^9.39.0',
    'eslint-plugin-react-hooks': '^7.1.1',
    'eslint-plugin-react-refresh': '^0.5.2',
    globals: '^17.6.0',
    tailwindcss: '^4.3.0',
    typescript: '~5.9.0',
    'typescript-eslint': '^8.59.2',
    vite: '^8.0.12',
  },
}

function writeCleanPackageJson() {
  writeFileSync(pkgPath, `${JSON.stringify(packageJson, null, 2)}\n`)
}

function removeBadParentLink() {
  if (existsSync(badLink)) {
    rmSync(badLink, { recursive: true, force: true })
    console.log('Removed tools/colors/node_modules/daygrain-hub symlink')
  }
}

writeCleanPackageJson()
removeBadParentLink()

if (existsSync(lockPath) && readFileSync(lockPath, 'utf8').includes('daygrain-hub')) {
  rmSync(lockPath, { force: true })
}

const vitePkg = join(modulesDir, 'vite', 'package.json')
if (!existsSync(vitePkg)) {
  if (existsSync(modulesDir)) rmSync(modulesDir, { recursive: true, force: true })
  if (existsSync(lockPath)) rmSync(lockPath, { force: true })
}

execSync('npm install --no-fund --no-audit --no-workspaces --include=dev', {
  cwd: root,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development',
    npm_config_workspaces: 'false',
    npm_config_install_strategy: 'nested',
  },
})

const installed = JSON.parse(readFileSync(pkgPath, 'utf8'))
if (installed.dependencies?.['daygrain-hub']) {
  delete installed.dependencies['daygrain-hub']
  writeFileSync(pkgPath, `${JSON.stringify(installed, null, 2)}\n`)
}
removeBadParentLink()

if (!existsSync(join(modulesDir, 'vite', 'package.json'))) {
  console.error('vite was not installed into tools/colors/node_modules')
  process.exit(1)
}

console.log('Colors deps installed cleanly.')
