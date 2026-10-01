import type { WineRecord } from "@/lib/catalog/types";

export type WineFormValuesMap = Record<string, string>;

/** Пустой шаблон новой карточки — значения по умолчанию, как у текущей коллекции. */
export const emptyWine: WineFormValuesMap = {
  name: "",
  slug: "",
  vintage: String(new Date().getFullYear() - 1),
  color: "WHITE",
  sweetness: "DRY",
  appellation: "ЗГУ «Кубань»",
  intro: "",
  origin: "Россия, Краснодарский край",
  grapes: "",
  aging: "",
  abv: "",
  serving: "",
  appearance: "",
  aroma: "",
  taste: "",
  pairing: "",
  imageMain: "",
  imageDetail: "",
  purchaseUrl: "",
  published: "on",
  sortOrder: "100",
};

export function wineToFormValues(wine: WineRecord): WineFormValuesMap {
  return {
    ...emptyWine,
    ...Object.fromEntries(
      Object.entries(wine).map(([key, value]) => [key, value === null ? "" : String(value)]),
    ),
    published: wine.published ? "on" : "",
  };
}
