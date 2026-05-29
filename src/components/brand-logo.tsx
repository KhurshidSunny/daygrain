import Image from "next/image"
import Link from "next/link"
import { brandLogoSrc } from "@/lib/site-config"

export function BrandLogo() {
  return (
    <Link href="/" className="inline-flex rounded-xl transition-transform duration-200 hover:scale-[1.03]">
      <Image
        src={brandLogoSrc}
        alt="Daygrain"
        width={80}
        height={80}
        className="h-14 w-auto max-w-[180px] object-contain sm:h-16"
        priority
        sizes="(max-width: 640px) 140px, 180px"
      />
    </Link>
  )
}
