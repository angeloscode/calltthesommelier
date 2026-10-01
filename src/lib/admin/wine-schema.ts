import { z } from "zod";
import { WineColor, WineSweetness } from "@/generated/prisma/enums";

const text = (label: string) => z.string().trim().min(1, `Заполните поле «${label}»`);

const optionalText = z
  .string()
  .trim()
  .transform((value) => value || null);

const imagePath = z
  .string()
  .trim()
  .refine((value) => value === "" || value.startsWith("/"), "Путь к картинке должен начинаться с /")
  .transform((value) => value || null);

/** Поля формы товара (без файлов — они обрабатываются отдельно). */
export const wineFormSchema = z.object({
  name: text("Название"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .refine((value) => value === "" || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value), "Только латиница, цифры и дефисы"),
  vintage: z.coerce
    .number({ error: "Укажите год урожая" })
    .int("Год — целое число")
    .min(1900, "Слишком ранний год")
    .max(2100, "Слишком поздний год"),
  color: z.enum(WineColor, { error: "Выберите цвет вина" }),
  sweetness: z.enum(WineSweetness, { error: "Выберите сахар" }),
  appellation: text("Статус/ЗГУ"),
  intro: text("Короткое описание"),
  origin: text("Происхождение"),
  grapes: text("Сорта"),
  aging: optionalText,
  abv: text("Крепость"),
  serving: text("Подача"),
  appearance: text("Цвет в бокале"),
  aroma: text("Аромат"),
  taste: text("Вкус"),
  pairing: text("Гастрономия"),
  imageMain: imagePath,
  imageDetail: imagePath,
  purchaseUrl: z
    .string()
    .trim()
    .refine((value) => value === "" || URL.canParse(value), "Ссылка должна быть полным адресом (https://…)")
    .transform((value) => value || null),
  published: z.preprocess((value) => value === "on" || value === "true", z.boolean()),
  sortOrder: z.coerce.number().int().default(0),
});

export type WineFormValues = z.input<typeof wineFormSchema>;

export type WineFormState = {
  status: "idle" | "error";
  message?: string;
  /** Введённые значения: React сбрасывает форму после экшена, по ним поля восстанавливаются. */
  values?: Record<string, string>;
  /** Меняется при каждой ошибке — форма пересоздаётся с введёнными значениями. */
  attempt?: string;
  fieldErrors?: Partial<Record<keyof WineFormValues | "imageMainFile" | "imageDetailFile", string>>;
};
