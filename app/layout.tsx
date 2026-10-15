import type { Metadata } from "next";
import { Shell } from "@/components/site";
import "./globals.css";

const title = "Gromoze | Real Estate Sales Software";
const description =
  "Explore how property enquiries, site visits and sales follow-ups connect in Gromoze's illustrative workspace for real estate teams. Private product concept.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Gromoze",
  },
  description,
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    siteName: "Gromoze",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
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
