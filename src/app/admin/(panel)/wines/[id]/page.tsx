import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { updateWine } from "@/app/admin/actions";
import { WineForm } from "@/components/admin/wineForm";
import { wineToFormValues } from "@/lib/admin/wine-form-values";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Редактирование вина" };

export default async function EditWinePage({ params }: PageProps<"/admin/wines/[id]">) {
  const { id } = await params;
  const wine = await prisma.wine.findUnique({ where: { id } });
  if (!wine) notFound();

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">
          {wine.name} {wine.vintage}
        </h1>
        <p className="text-sm text-muted-foreground">Изменения появятся на сайте сразу после сохранения.</p>
      </div>
      <WineForm
        action={updateWine.bind(null, wine.id)}
        initialValues={wineToFormValues(wine)}
        submitLabel="Сохранить"
      />
    </div>
  );
}
