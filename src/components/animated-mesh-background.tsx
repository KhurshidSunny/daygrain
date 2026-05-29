export function AnimatedMeshBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="mesh-blob mesh-blob-a" />
      <div className="mesh-blob mesh-blob-b" />
      <div className="mesh-blob mesh-blob-c" />
      <div className="mesh-grid" />
    </div>
  )
}
