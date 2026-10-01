import { colorLabels, sweetnessLabels } from "./labels";
import type { CatalogWine, WineRecord } from "./types";

export function toCatalogWine(wine: WineRecord): CatalogWine {
  const facts: [string, string][] = [
    ["Происхождение", wine.origin],
    ["Год урожая", String(wine.vintage)],
    [wine.grapes.includes(",") ? "Сорта" : "Сорт", wine.grapes],
  ];
  if (wine.aging) facts.push(["Выдержка", wine.aging]);
  facts.push(["Крепость", wine.abv], ["Подача", wine.serving], ["Цвет", wine.appearance]);

  return {
    slug: wine.slug,
    name: wine.name,
    vintage: wine.vintage,
    category: `Российское вино с ${wine.appellation} · ${sweetnessLabels[wine.sweetness]} ${colorLabels[wine.color]}`,
    intro: wine.intro,
    facts,
    tasting: [
      ["Аромат", wine.aroma],
      ["Вкус", wine.taste],
      ["Гастрономия", wine.pairing],
    ],
    images: [wine.imageMain, wine.imageDetail].filter((image): image is string => Boolean(image)),
    purchase: wine.purchaseUrl,
  };
}
