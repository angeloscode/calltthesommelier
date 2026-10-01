import type { Metadata } from "next";
import { createWine } from "@/app/admin/actions";
import { WineForm } from "@/components/admin/wineForm";
import { emptyWine, wineToFormValues } from "@/lib/admin/wine-form-values";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Новое вино" };

export default async function NewWinePage({ searchParams }: PageProps<"/admin/wines/new">) {
  const { from } = await searchParams;
  const template = typeof from === "string" ? await prisma.wine.findUnique({ where: { id: from } }) : null;

  // «Создать по шаблону»: копируем карточку, но адрес и фото — новые.
  const initialValues = template
    ? { ...wineToFormValues(template), slug: "", imageMain: "", imageDetail: "", purchaseUrl: "" }
    : emptyWine;

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Новое вино</h1>
        <p className="text-sm text-muted-foreground">
          {template
            ? `Заполнено по шаблону «${template.name} ${template.vintage}» — поменяйте отличающиеся поля.`
            : "Заполните карточку по шаблону — справа видно, как она будет выглядеть на сайте."}
        </p>
      </div>
      <WineForm action={createWine} initialValues={initialValues} submitLabel="Добавить вино" />
    </div>
  );
}
