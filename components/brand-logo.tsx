import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  priority?: boolean;
};

export function BrandLogo({
  className = "",
  imageClassName = "",
  textClassName = "",
  priority = false,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 ${className}`.trim()}
    >
      <Image
        src="/logo.png"
        alt="Pay Zen logo"
        width={52}
        height={40}
        priority={priority}
        className={`h-auto w-[52px] object-contain ${imageClassName}`.trim()}
      />
      <span className={`font-bold tracking-tight text-black ${textClassName}`.trim()}>
        Pay Zen
      </span>
    </Link>
  );
}
