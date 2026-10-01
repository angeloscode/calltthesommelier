# Позовите Сомелье

Сайт коллекции российских вин из долины реки Афипс и панель управления каталогом.

- `/` — главная, вёрстка по макету Tilda; витрина вин читается из БД
- `/first-version` — альтернативная версия лендинга (закрыта от индексации)
- `/admin` — панель управления товарами (Auth.js + Prisma + PostgreSQL)

## Стек

Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui (Base UI), Auth.js v5 (NextAuth), Prisma 7 + PostgreSQL.

## Запуск

```bash
npm install                 # заодно генерирует Prisma Client
cp .env.example .env        # заполнить DATABASE_URL, AUTH_SECRET, ADMIN_*
npm run db:deploy           # применить миграции
npm run db:seed             # создать администратора и исходные 5 вин
npm run dev
```

`AUTH_SECRET` генерируется командой `npx auth secret`. Пока БД не настроена или недоступна, главная показывает исходную коллекцию из `src/lib/catalog/seed-data.ts`.

## Админка

Вход — `/admin/login` (email и пароль из `ADMIN_EMAIL` / `ADMIN_PASSWORD`; повторный `npm run db:seed` обновит пароль).

- список товаров, включение/скрытие на сайте, порядок вывода
- добавление вина по шаблону карточки с живым предпросмотром, «создать по этому шаблону» из существующего
- загрузка фото (JPG/PNG/WebP/AVIF до 8 МБ) в `UPLOAD_DIR` (по умолчанию `storage/uploads`), отдаются по `/media/…`

После сохранения главная и sitemap обновляются сразу. Папку `storage/` нужно сохранять между деплоями (volume/диск сервера).

## Скрипты

| Команда | Что делает |
| --- | --- |
| `npm run db:migrate` | новая миграция после изменения `prisma/schema.prisma` (dev) |
| `npm run db:deploy` | применить миграции (прод) |
| `npm run db:seed` | администратор + исходные вина |
| `npm run db:studio` | Prisma Studio |

## Структура

```
prisma/                    схема, миграции, сид
src/app/                   маршруты (главная, first-version, admin, media, SEO)
src/components/home/       секции главной
src/components/first-version/
src/components/admin/      формы и элементы админки
src/components/ui/         shadcn/ui
src/lib/catalog/           каталог вин: типы, форматирование карточки, исходные данные
src/lib/admin/             сессия, валидация формы, загрузки
src/styles/                globals.css (тема, шрифты), home.css, first-version.css
```

## Перед продакшеном

- `NEXT_PUBLIC_SITE_URL` — боевой домен (canonical, sitemap, Open Graph)
- `AUTH_SECRET` — свой, не из примера
- сайт добавить в Яндекс.Вебмастер и Google Search Console, отправить `/sitemap.xml`
