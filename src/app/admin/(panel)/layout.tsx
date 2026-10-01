import { ExternalLink, LogOut, Plus, Wine } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/admin/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminPanelLayout({ children }: LayoutProps<"/admin">) {
  const session = await requireAdmin();

  return (
    <>
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Wine className="size-5 text-[#720005]" aria-hidden="true" />
            Позовите Сомелье
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link href="/admin" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              Товары
            </Link>
            <Link href="/admin/wines/new" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              <Plus aria-hidden="true" /> Добавить
            </Link>
            <Link href="/" target="_blank" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              На сайт <ExternalLink aria-hidden="true" />
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">{session.user.email}</span>
            <form action={logout}>
              <Button type="submit" variant="outline" size="sm">
                <LogOut aria-hidden="true" /> Выйти
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </>
  );
}
