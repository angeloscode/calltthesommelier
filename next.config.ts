import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-сервер по умолчанию отдаёт скрипты только для localhost: без этого при открытии
  // по IP (в т.ч. с телефона в локальной сети) страница не гидрируется и ничего не кликается.
  allowedDevOrigins: ["127.0.0.1", "192.168.*.*", "10.*.*.*"],
  experimental: {
    // Фото товаров в админке — до 8 МБ каждое, две штуки на форму.
    serverActions: { bodySizeLimit: "20mb" },
  },
};

export default nextConfig;
