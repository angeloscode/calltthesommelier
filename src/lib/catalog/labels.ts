import type { WineColor, WineSweetness } from "@/generated/prisma/enums";

export const colorLabels: Record<WineColor, string> = {
  WHITE: "белое",
  RED: "красное",
  ROSE: "розовое",
  ORANGE: "оранжевое",
  SPARKLING: "игристое",
};

export const sweetnessLabels: Record<WineSweetness, string> = {
  DRY: "Сухое",
  SEMI_DRY: "Полусухое",
  SEMI_SWEET: "Полусладкое",
  SWEET: "Сладкое",
};

export const colorOptions = Object.entries(colorLabels) as [WineColor, string][];
export const sweetnessOptions = Object.entries(sweetnessLabels) as [WineSweetness, string][];
