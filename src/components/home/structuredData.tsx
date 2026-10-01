import type { CatalogWine } from "@/lib/catalog/types";
import { absoluteUrl, ogImage, siteDescription, siteName, siteUrl } from "@/lib/site";

export function StructuredData({ wines }: { wines: CatalogWine[] }) {
  const brandId = `${siteUrl}/#brand`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Brand",
        "@id": brandId,
        name: siteName,
        url: siteUrl,
        logo: absoluteUrl("/images/brand-mark.svg"),
        description: siteDescription,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        inLanguage: "ru-RU",
        publisher: { "@id": brandId },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: `${siteName} — коллекция российских вин`,
        description: siteDescription,
        inLanguage: "ru-RU",
        isPartOf: { "@id": `${siteUrl}/#website` },
        primaryImageOfPage: absoluteUrl(ogImage.url),
        about: { "@id": brandId },
      },
      {
        "@type": "ItemList",
        name: "Вина коллекции «Позовите Сомелье»",
        itemListElement: wines.map((wine, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: `${siteName} ${wine.name} ${wine.vintage}`,
            description: wine.intro,
            category: wine.category,
            image: wine.images.map(absoluteUrl),
            brand: { "@id": brandId },
            countryOfOrigin: { "@type": "Country", name: "Россия" },
            ...(wine.purchase ? { url: wine.purchase } : {}),
            additionalProperty: wine.facts.map(([name, value]) => ({
              "@type": "PropertyValue",
              name,
              value,
            })),
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
