import { CircleCheck, Plus } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PublishSwitch, WineRowActions } from "@/components/admin/wineRowActions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { colorLabels, sweetnessLabels } from "@/lib/catalog/labels";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Товары" };

export default async function AdminWinesPage({ searchParams }: PageProps<"/admin">) {
  const { saved } = await searchParams;
  const wines = await prisma.wine.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
  const publishedCount = wines.filter((wine) => wine.published).length;

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Товары</h1>
          <p className="text-sm text-muted-foreground">
            Всего {wines.length}, на сайте {publishedCount}
          </p>
        </div>
        <Link href="/admin/wines/new" className={buttonVariants({ size: "lg" })}>
          <Plus aria-hidden="true" /> Добавить вино
        </Link>
      </div>

      {typeof saved === "string" && (
        <Alert>
          <CircleCheck aria-hidden="true" />
          <AlertTitle>Сохранено</AlertTitle>
          <AlertDescription>«{saved}» обновлено на сайте.</AlertDescription>
        </Alert>
      )}

      {wines.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Каталог пуст</CardTitle>
            <CardDescription>
              Пока в базе нет вин, сайт показывает исходную коллекцию. Добавьте первое вино или
              загрузите исходные командой <code>npm run db:seed</code>.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Card className="py-0">
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20 pl-4">Фото</TableHead>
                  <TableHead>Вино</TableHead>
                  <TableHead className="hidden md:table-cell">Тип</TableHead>
                  <TableHead className="hidden sm:table-cell">Порядок</TableHead>
                  <TableHead>На сайте</TableHead>
                  <TableHead className="w-12 pr-4" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {wines.map((wine) => (
                  <TableRow key={wine.id}>
                    <TableCell className="pl-4">
                      <Image
                        src={wine.imageMain}
                        alt=""
                        width={64}
                        height={46}
                        className="h-12 w-16 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/wines/${wine.id}`} className="font-medium hover:underline">
                        {wine.name} {wine.vintage}
                      </Link>
                      <div className="text-xs text-muted-foreground">/{wine.slug}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">
                        {sweetnessLabels[wine.sweetness]} {colorLabels[wine.color]}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{wine.sortOrder}</TableCell>
                    <TableCell>
                      <PublishSwitch wineId={wine.id} published={wine.published} />
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      <WineRowActions wineId={wine.id} name={`${wine.name} ${wine.vintage}`} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
