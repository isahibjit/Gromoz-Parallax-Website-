import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Interior } from "@/components/site";
import { audiences, modules, routes } from "@/lib/content";

export const dynamicParams = false;

interface PageCopy {
  readonly title: string;
  readonly description: string;
}

const pageCopy: Readonly<Record<string, PageCopy | undefined>> = {
  product: {
    title: "Product overview",
    description:
      "Follow a sample property enquiry through ownership, a unit discussion, a site visit and the next action in the proposed Gromoze workspace.",
  },
  pricing: {
    title: "Pricing enquiry",
    description:
      "Outline your real estate team's size and workflow requirements in Gromoze's pricing enquiry preview. Plans and prices are awaiting confirmation.",
  },
  about: {
    title: "About Gromoze",
    description:
      "Explore Gromoze's purpose: bringing people, property conversations and next actions into a shared real estate sales workspace. Private product concept.",
  },
  "book-demo": {
    title: "Book a Demo",
    description:
      "Preview a demo request for your real estate team and outline the workflow you want to discuss. This preview does not send an enquiry or book a meeting.",
  },
  contact: {
    title: "Contact",
    description:
      "Explore the Gromoze enquiry preview and describe your team's needs. Verified business contact details and enquiry delivery are awaiting configuration.",
  },
  "privacy-policy": {
    title: "Privacy policy",
    description:
      "Learn how Solverix Technologies Pvt. Ltd. handles Gromoze website information, browser storage, external fonts, correspondence and privacy requests.",
  },
  "terms-of-service": {
    title: "Terms of service",
    description:
      "Read the terms governing the Gromoze website, its demonstrations, acceptable use, intellectual property and enquiries. Operated by Solverix Technologies Pvt. Ltd.",
  },
  "cookie-policy": {
    title: "Cookie and browser-storage notice",
    description:
      "Understand Gromoze's motion preference, session-only story position, external font requests and browser-storage controls.",
  },
};

function requireKnownRoute(slug: readonly string[]) {
  const route = slug.join("/");
  if (!routes.includes(route)) notFound();
  return route;
}

function getPageCopy(route: string): PageCopy {
  const staticCopy = pageCopy[route];
  if (staticCopy) return staticCopy;

  const feature = modules.find((module) => route === `features/${module.slug}`);
  if (feature) {
    return {
      title: feature.title,
      description: `${feature.task} Explore ${feature.title.toLowerCase()} in Gromoze's illustrative real estate sales workflow. Capabilities are awaiting confirmation.`,
    };
  }

  const audience = audiences.find((item) => route === `solutions/${item.slug}`);
  if (audience) {
    return {
      title: `For ${audience.title.toLowerCase()}`,
      description: `${audience.text} Explore an illustrative Gromoze workflow for ${audience.title.toLowerCase()}.`,
    };
  }

  notFound();
}

export function generateStaticParams() {
  return routes.map((route) => ({ slug: route.split("/") }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { title, description } = getPageCopy(requireKnownRoute(slug));
  const socialTitle = `${title} | Gromoze`;
  return {
    title,
    description,
    openGraph: {
      title: socialTitle,
      description,
      siteName: "Gromoze",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <Interior route={requireKnownRoute(slug)} />;
}
