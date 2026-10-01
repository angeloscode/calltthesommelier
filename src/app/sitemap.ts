import type { MetadataRoute } from "next";
import { getCatalog } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const wines = await getCatalog();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        absoluteUrl("/images/hero-bottles.jpg"),
        ...wines.flatMap((wine) => wine.images.map(absoluteUrl)),
      ],
    },
  ];
}
