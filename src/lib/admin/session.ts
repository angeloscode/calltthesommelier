import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

/** Пускает в админку только авторизованных; остальных отправляет на страницу входа. */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session;
}
