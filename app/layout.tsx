import type { Metadata } from "next";
import { Shell } from "@/components/site";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Gromoze | Real Estate Sales Software",
    template: "%s | Gromoze",
  },
  description:
    "Explore a proposed shared workspace for real estate enquiries, follow-ups, properties and site visits.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
