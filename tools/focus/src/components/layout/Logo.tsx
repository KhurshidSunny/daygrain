interface LogoProps {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}daygrain-logo1.PNG`}
      alt="Daygrain Focus"
      className={`h-14 w-auto max-w-[180px] object-contain sm:h-16 ${className}`}
      width={180}
      height={64}
    />
  )
}
