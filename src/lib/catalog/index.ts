import "server-only";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { toCatalogWine } from "./format";
import { seedWines } from "./seed-data";
import type { CatalogWine } from "./types";

export type { CatalogWine } from "./types";

const fallbackCatalog = seedWines.map(toCatalogWine);

/** Опубликованные вина для витрины. Без БД (или при её ошибке) сайт показывает исходную коллекцию. */
export async function getCatalog(): Promise<CatalogWine[]> {
  if (!isDatabaseConfigured) return fallbackCatalog;

  try {
    const wines = await prisma.wine.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return wines.map(toCatalogWine);
  } catch (error) {
    console.error("[catalog] Не удалось загрузить вина из БД, показываю исходную коллекцию", error);
    return fallbackCatalog;
  }
}
