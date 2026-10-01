import { NextResponse } from "next/server";

// Админка включается сама, как только в окружении есть база и секрет Auth.js.
// До этого (например, на Vercel без БД) сайт работает, а /admin отвечает заглушкой вместо 500.
const isAdminEnabled = Boolean(process.env.DATABASE_URL && process.env.AUTH_SECRET);

export function proxy() {
  if (isAdminEnabled) return NextResponse.next();

  return new NextResponse(
    "<!doctype html><html lang=\"ru\"><meta charset=\"utf-8\"><title>Админка отключена</title>" +
      "<body style=\"font-family:system-ui,sans-serif;max-width:560px;margin:15vh auto;padding:0 20px;line-height:1.5\">" +
      "<h1 style=\"font-size:22px\">Админка временно отключена</h1>" +
      "<p>Не заданы переменные окружения <code>DATABASE_URL</code> и <code>AUTH_SECRET</code>. " +
      "Подключите базу PostgreSQL, примените миграции и задайте секрет — панель включится автоматически.</p></body></html>",
    { status: 503, headers: { "Content-Type": "text/html; charset=utf-8", "Retry-After": "3600" } },
  );
}

export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
};
