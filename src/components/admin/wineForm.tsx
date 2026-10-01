"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState, type ReactNode } from "react";
import { toCatalogWine } from "@/lib/catalog/format";
import { colorLabels, colorOptions, sweetnessLabels, sweetnessOptions } from "@/lib/catalog/labels";
import { emptyWine, type WineFormValuesMap as Values } from "@/lib/admin/wine-form-values";
import type { WineFormState } from "@/lib/admin/wine-schema";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

type FieldName = keyof NonNullable<WineFormState["fieldErrors"]>;

type WineFormProps = {
  action: (state: WineFormState, formData: FormData) => Promise<WineFormState>;
  initialValues?: Values;
  submitLabel: string;
};

export function WineForm({ action, initialValues = emptyWine, submitLabel }: WineFormProps) {
  const [state, formAction, isPending] = useActionState(action, { status: "idle" });
  const defaults = state.values ? { ...state.values, published: state.values.published ?? "" } : initialValues;
  const [preview, setPreview] = useState<Values>(defaults);
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [detailPreview, setDetailPreview] = useState<string | null>(null);

  const error = (name: FieldName) => state.fieldErrors?.[name];
  const update = (name: string, value: string) => setPreview((current) => ({ ...current, [name]: value }));

  function field(name: FieldName, label: string, options: { hint?: string; placeholder?: string; type?: string; required?: boolean } = {}) {
    return (
      <Field name={name} label={label} hint={options.hint} error={error(name)}>
        <Input
          id={name}
          name={name}
          type={options.type ?? "text"}
          defaultValue={defaults[name]}
          placeholder={options.placeholder}
          required={options.required}
          aria-invalid={Boolean(error(name))}
          onChange={(event) => update(name, event.target.value)}
        />
      </Field>
    );
  }

  function area(name: FieldName, label: string, placeholder: string) {
    return (
      <Field name={name} label={label} error={error(name)}>
        <Textarea
          id={name}
          name={name}
          rows={3}
          defaultValue={defaults[name]}
          placeholder={placeholder}
          required
          aria-invalid={Boolean(error(name))}
          onChange={(event) => update(name, event.target.value)}
        />
      </Field>
    );
  }

  return (
    <form
      key={state.attempt ?? "initial"}
      action={formAction}
      className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"
    >
      <div className="grid gap-6">
        {state.status === "error" && state.message && (
          <Alert variant="destructive">
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        <Section title="Основное" description="Название без бренда — «Позовите Сомелье» добавится на сайте автоматически.">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_140px]">
            {field("name", "Название", { placeholder: "Ркацители–Мцване", required: true })}
            {field("vintage", "Год урожая", { type: "number", required: true })}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="sweetness" label="Сахар" error={error("sweetness")}>
              <Select
                name="sweetness"
                items={sweetnessLabels}
                defaultValue={defaults.sweetness}
                onValueChange={(value) => update("sweetness", String(value))}
              >
                <SelectTrigger id="sweetness" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sweetnessOptions.map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field name="color" label="Цвет вина" error={error("color")}>
              <Select
                name="color"
                items={colorLabels}
                defaultValue={defaults.color}
                onValueChange={(value) => update("color", String(value))}
              >
                <SelectTrigger id="color" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          {field("appellation", "Статус / ЗГУ", { placeholder: "ЗГУ «Кубань. Долина реки Афипс»", required: true })}
          {field("slug", "Адрес (slug)", {
            hint: "Латиница и дефисы. Если оставить пустым — соберётся из названия и года.",
            placeholder: "kaberne-fran-2024",
          })}
          {area("intro", "Короткое описание", "Современное прочтение двух классических грузинских сортов…")}
        </Section>

        <Section title="Характеристики" description="Список фактов в карточке — в том же порядке.">
          <div className="grid gap-4 sm:grid-cols-2">
            {field("origin", "Происхождение", { required: true })}
            {field("grapes", "Сорта", { placeholder: "Мцване, Ркацители", hint: "Через запятую", required: true })}
            {field("aging", "Выдержка", { placeholder: "6 месяцев", hint: "Необязательно" })}
            {field("abv", "Крепость", { placeholder: "12,5%", required: true })}
            {field("serving", "Подача", { placeholder: "10–12 °C", required: true })}
            {field("appearance", "Цвет в бокале", { placeholder: "золотисто-соломенный", required: true })}
          </div>
        </Section>

        <Section title="Дегустация">
          {area("aroma", "Аромат", "желтое спелое яблоко, легкие цветочные ноты…")}
          {area("taste", "Вкус", "округлый, гармоничный, с мягкой фруктовой сладостью…")}
          {area("pairing", "Гастрономия", "рыба, птица, белое мясо, сыры…")}
        </Section>

        <Section title="Фото" description="JPG, PNG, WebP или AVIF до 8 МБ. Основное — бутылка на светлом фоне, второе — атмосферное.">
          <ImageField
            name="imageMain"
            label="Основное фото"
            currentPath={defaults.imageMain}
            previewUrl={mainPreview}
            error={error("imageMainFile")}
            onFileChange={setMainPreview}
            onPathChange={(value) => update("imageMain", value)}
          />
          <ImageField
            name="imageDetail"
            label="Второе фото"
            currentPath={defaults.imageDetail}
            previewUrl={detailPreview}
            error={error("imageDetailFile")}
            onFileChange={setDetailPreview}
            onPathChange={(value) => update("imageDetail", value)}
          />
        </Section>

        <Section title="Публикация">
          {field("purchaseUrl", "Ссылка «Купить»", { type: "url", placeholder: "https://vinotheque.ru/catalog/…" })}
          <div className="grid gap-4 sm:grid-cols-2">
            {field("sortOrder", "Порядок на сайте", { type: "number", hint: "Меньше — выше на странице" })}
            <div className="flex items-center gap-3 pt-6">
              <Switch id="published" name="published" defaultChecked={defaults.published === "on"} />
              <Label htmlFor="published">Показывать на сайте</Label>
            </div>
          </div>
        </Section>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? "Сохраняем…" : submitLabel}
          </Button>
          <Link href="/admin" className={buttonVariants({ variant: "outline", size: "lg" })}>
            Отмена
          </Link>
        </div>
      </div>

      <WinePreview values={preview} image={mainPreview ?? preview.imageMain} />
    </form>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="grid gap-4">{children}</CardContent>
    </Card>
  );
}

function Field({ name, label, hint, error, children }: { name: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div className="grid content-start gap-2">
      <Label htmlFor={name}>{label}</Label>
      {children}
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : (
        hint && <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

type ImageFieldProps = {
  name: "imageMain" | "imageDetail";
  label: string;
  currentPath: string;
  previewUrl: string | null;
  error?: string;
  onFileChange: (url: string | null) => void;
  onPathChange: (value: string) => void;
};

function ImageField({ name, label, currentPath, previewUrl, error, onFileChange, onPathChange }: ImageFieldProps) {
  const [path, setPath] = useState(currentPath);
  const shown = previewUrl ?? (path.startsWith("/") ? path : null);

  return (
    <div className="grid gap-3 rounded-lg border p-3 sm:grid-cols-[120px_minmax(0,1fr)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
        {shown ? (
          // Превью локального файла (blob:) next/image не оптимизирует — показываем как есть.
          <Image src={shown} alt="" fill unoptimized className="object-cover" sizes="120px" />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-xs text-muted-foreground">Нет фото</span>
        )}
      </div>
      <div className="grid gap-3">
        <Field name={`${name}File`} label={label} error={error}>
          <Input
            id={`${name}File`}
            name={`${name}File`}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            aria-invalid={Boolean(error)}
            onChange={(event) => {
              const file = event.target.files?.[0];
              onFileChange(file ? URL.createObjectURL(file) : null);
            }}
          />
        </Field>
        <Field name={name} label="или путь к уже загруженному файлу" hint="Например, /images/wine-kachich.jpg">
          <Input
            id={name}
            name={name}
            value={path}
            placeholder="/images/…"
            onChange={(event) => {
              setPath(event.target.value);
              onPathChange(event.target.value);
            }}
          />
        </Field>
      </div>
    </div>
  );
}

function WinePreview({ values, image }: { values: Values; image: string }) {
  const color = (values.color in colorLabels ? values.color : "WHITE") as keyof typeof colorLabels;
  const sweetness = (values.sweetness in sweetnessLabels ? values.sweetness : "DRY") as keyof typeof sweetnessLabels;
  const wine = toCatalogWine({
    slug: values.slug,
    name: values.name || "Название вина",
    vintage: Number(values.vintage) || new Date().getFullYear(),
    color,
    sweetness,
    appellation: values.appellation || "ЗГУ «…»",
    intro: values.intro || "Короткое описание вина.",
    origin: values.origin || "…",
    grapes: values.grapes || "…",
    aging: values.aging || null,
    abv: values.abv || "…",
    serving: values.serving || "…",
    appearance: values.appearance || "…",
    aroma: values.aroma || "…",
    taste: values.taste || "…",
    pairing: values.pairing || "…",
    imageMain: image,
    imageDetail: null,
    purchaseUrl: values.purchaseUrl || null,
    published: true,
    sortOrder: 0,
  });

  return (
    <aside className="sticky top-20 hidden overflow-hidden rounded-xl bg-[#720005] text-white shadow-sm lg:block">
      <p className="px-4 pt-3 text-xs uppercase tracking-wider text-white/60">Предпросмотр карточки</p>
      <div className="relative mx-4 mt-3 aspect-[1680/1197] overflow-hidden rounded bg-[#e8e8e8]">
        {image.startsWith("/") || image.startsWith("blob:") ? (
          <Image src={image} alt="" fill unoptimized className="object-cover" sizes="330px" />
        ) : null}
      </div>
      <div className="grid gap-3 p-4 text-[13px] leading-snug">
        <div>
          <p className="text-base font-semibold">
            ПОЗОВИТЕ СОМЕЛЬЕ
            <br />
            {wine.name}
          </p>
          <p className="mt-1 text-white/70">{wine.category}</p>
        </div>
        <p>{wine.intro}</p>
        <ul>
          {wine.facts.map(([label, value]) => (
            <li key={label}><strong>{label}:</strong> {value}</li>
          ))}
        </ul>
        <ul>
          {wine.tasting.map(([label, value]) => (
            <li key={label}><strong>{label}:</strong> {value}</li>
          ))}
        </ul>
        {wine.purchase && (
          <span className="inline-flex h-9 w-fit items-center rounded-full bg-[#ff4a4a] px-5 text-xs font-semibold uppercase">
            Купить
          </span>
        )}
      </div>
    </aside>
  );
}
