// Боевой домен задаётся через NEXT_PUBLIC_SITE_URL (например, https://pozovite-somelie.ru):
// от него строятся canonical, sitemap, robots, Open Graph и JSON-LD.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const siteName = "Позовите Сомелье";

export const siteTitle = "Позовите Сомелье — коллекция российских вин из долины реки Афипс";

export const siteDescription =
  "Коллекция российских вин «Позовите Сомелье» из Краснодарского края: Ркацители–Мцване, Сибирьковый–Пино Гри, Каберне Фран и Качич. ЗГУ «Долина реки Афипс», ручной сбор, вина от сети винотек «Культура Крепкого».";

export const siteKeywords = [
  "Позовите Сомелье",
  "российское вино",
  "вино Краснодарского края",
  "вино Кубани",
  "долина реки Афипс",
  "ЗГУ Кубань",
  "Ркацители Мцване",
  "Сибирьковый Пино Гри",
  "Каберне Фран",
  "Качич",
  "сухое белое вино",
  "сухое красное вино",
  "Культура Крепкого",
  "купить вино",
];

export const ogImage = {
  url: "/images/hero-bottles.jpg",
  width: 1680,
  height: 1197,
  alt: "Пять вин коллекции «Позовите Сомелье»",
};

export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
