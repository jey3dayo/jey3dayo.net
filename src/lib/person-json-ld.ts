import { snsLinks } from "../data/sns";

interface PersonJsonLd {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  jobTitle: string;
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  url: string;
  sameAs: string[];
}

export function personJsonLd(siteUrl: URL): string {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Junya Nakazato",
    jobTitle: "Web Engineer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "那覇市",
      addressRegion: "沖縄県",
      addressCountry: "JP",
    },
    url: siteUrl.toString(),
    sameAs: snsLinks.map((link) => link.href),
  } satisfies PersonJsonLd;

  return JSON.stringify(person).replace(/</g, "\\u003c");
}
