import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

interface PageMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "",
  image = "/og-image.png",
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "" ? `${SITE_NAME} — Discover Premium Events` : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "events",
      "event booking",
      "conferences",
      "workshops",
      "tickets",
      "TechVerse",
      "technology events",
    ],
    authors: [{ name: SITE_NAME }],
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}
