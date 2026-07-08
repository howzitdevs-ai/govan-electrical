import { useEffect } from "react";

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;        // path only, e.g. "/" or "/solar-solutions"
  ogImage?: string;
  schema?: object | object[];
}

const SITE_NAME = "Govan Electrical";
const SITE_URL = "https://www.govanelectrical.co.za";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const SCHEMA_SCRIPT_ID = "seo-json-ld";

function setMeta(attr: "name" | "property", attrValue: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(schema: object | object[]) {
  let el = document.getElementById(SCHEMA_SCRIPT_ID);
  if (!el) {
    el = document.createElement("script");
    el.id = SCHEMA_SCRIPT_ID;
    el.setAttribute("type", "application/ld+json");
    document.head.appendChild(el);
  }
  const schemas = Array.isArray(schema) ? schema : [schema];
  el.textContent = JSON.stringify(
    schemas.length === 1 ? schemas[0] : { "@context": "https://schema.org", "@graph": schemas },
    null,
    0
  );
}

function removeJsonLd() {
  document.getElementById(SCHEMA_SCRIPT_ID)?.remove();
}

export function useSEO({ title, description, keywords, canonical, ogImage, schema }: SEOProps) {
  useEffect(() => {
    const absoluteUrl = `${SITE_URL}${canonical}`;
    const image = ogImage || DEFAULT_OG_IMAGE;

    // Page title
    document.title = title;

    // Core meta
    setMeta("name", "description", description);
    setMeta("name", "robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    if (keywords) setMeta("name", "keywords", keywords);

    // Canonical
    setLink("canonical", absoluteUrl);

    // Open Graph
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", absoluteUrl);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:locale", "en_ZA");

    // Twitter / X Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    // JSON-LD Structured Data
    if (schema) {
      setJsonLd(schema);
    } else {
      removeJsonLd();
    }
  }, [title, description, keywords, canonical, ogImage, schema]);
}
