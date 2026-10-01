import Image from "next/image";

export function CollectionWine() {
  return (
    <section id="top" className="hero-section relative overflow-hidden bg-[#720005] text-white">
      <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-10 px-5 pb-14 pt-32 md:px-10 md:pb-20 md:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-16 lg:pb-16 lg:pt-32">
        <div>
          <p className="eyebrow mb-6 text-[#e5c99d]">Коллекция вин · Краснодарский край</p>
          <h1 className="hero-title font-display text-[42px] font-medium uppercase leading-[0.95] md:text-[54px] lg:whitespace-nowrap lg:text-[64px]">
            Позовите Сомелье
          </h1>
          <div className="hero-intro mt-10 max-w-[480px] border-l border-white/60 pl-6">
            <p className="mb-5 text-[19px] leading-[1.45] md:text-[22px]">
              Коллекция российских вин, созданная в Краснодарском крае, в долине реки Афипс.
            </p>
            <p className="text-lg leading-[1.6] text-white/90">
              Каждое вино — результат ручного сбора и внимательной работы с сортами, которые раскрывают потенциал терруара.
            </p>
            <a className="text-link mt-8 inline-flex items-center gap-4" href="#story">
              Исследовать коллекцию <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <Image
            src="/images/hero-podium.png"
            alt="Пять вин «Позовите Сомелье» на красных подиумах: белые Ркацители–Мцване и Сибирьковый–Пино Гри, красные Каберне Фран и Качич"
            width={677}
            height={744}
            preload
            sizes="(max-width: 1023px) 80vw, 560px"
            className="hero-bottles"
          />
        </div>
      </div>
      <p className="hero-index absolute bottom-5 right-5 hidden text-lg uppercase tracking-[0.14em] text-white/75 md:bottom-8 md:right-10 md:block">
        44° 52′ N · 38° 31′ E
      </p>
    </section>
  );
}
