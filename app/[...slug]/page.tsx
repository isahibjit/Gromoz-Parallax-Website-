import type { Metadata } from "next";
import { Interior } from "@/components/site";
import { routes } from "@/lib/content";
export function generateStaticParams() {
  return routes.map((route) => ({ slug: route.split("/") }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug
      .at(-1)
      ?.split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" "),
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <Interior route={slug.join("/")} />;
}
