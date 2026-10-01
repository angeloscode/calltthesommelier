"use client";

import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteWine, setWinePublished } from "@/app/admin/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

export function PublishSwitch({ wineId, published }: { wineId: string; published: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Switch
      checked={published}
      disabled={isPending}
      aria-label={published ? "Снять с публикации" : "Опубликовать"}
      onCheckedChange={(checked) =>
        startTransition(async () => {
          await setWinePublished(wineId, checked);
          toast.success(checked ? "Вино опубликовано" : "Вино скрыто с сайта");
        })
      }
    />
  );
}

export function WineRowActions({ wineId, name }: { wineId: string; name: string }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={`Действия: ${name}`} />}>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem render={<Link href={`/admin/wines/${wineId}`} />}>
            <Pencil /> Редактировать
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`/admin/wines/new?from=${wineId}`} />}>
            <Copy /> Создать по этому шаблону
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => setConfirmOpen(true)}>
            <Trash2 /> Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить «{name}»?</AlertDialogTitle>
            <AlertDialogDescription>
              Вино пропадёт с сайта, загруженные фото будут удалены. Отменить это нельзя.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Отмена</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  await deleteWine(wineId);
                  setConfirmOpen(false);
                  toast.success(`«${name}» удалено`);
                })
              }
            >
              {isPending ? "Удаляем…" : "Удалить"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
