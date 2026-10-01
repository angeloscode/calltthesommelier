import type { WineColor, WineSweetness } from "@/generated/prisma/enums";

/** Поля вина в том виде, в каком они хранятся в БД (без служебных). */
export type WineRecord = {
  slug: string;
  name: string;
  vintage: number;
  color: WineColor;
  sweetness: WineSweetness;
  appellation: string;
  intro: string;
  origin: string;
  grapes: string;
  aging: string | null;
  abv: string;
  serving: string;
  appearance: string;
  aroma: string;
  taste: string;
  pairing: string;
  imageMain: string;
  imageDetail: string | null;
  purchaseUrl: string | null;
  published: boolean;
  sortOrder: number;
};

/** Карточка вина для витрины сайта. */
export type CatalogWine = {
  slug: string;
  name: string;
  vintage: number;
  category: string;
  intro: string;
  facts: [string, string][];
  tasting: [string, string][];
  images: string[];
  purchase: string | null;
};
