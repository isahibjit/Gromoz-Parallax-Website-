import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function Logo() {
  return (
    <span className="logo-crop">
      <Image
        src="/gromoze-logo.png"
        alt="Gromoze. Real Estate Sales. Simplified."
        width={1448}
        height={1086}
        priority
      />
    </span>
  );
}
export function CTA({
  children = "Book a Demo",
  href = "/book-demo",
  secondary = false,
}: {
  children?: ReactNode;
  href?: string;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
