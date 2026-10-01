import Image from "next/image";

export function InfaOStatus() {
  return (
    <section id="story" className="story-section bg-[#f0ece2] text-[#211c19]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-16 lg:py-40">
        <div className="story-copy flex flex-col justify-between">
          <div>
            <p className="eyebrow mb-8 text-[#8a3027]">Позовите Сомелье · пять характеров</p>
            <h2 className="font-display text-[40px] font-medium leading-[1.02] md:text-[58px]">
              Пять уникальных характеров из солнечного Краснодарского края.
            </h2>
          </div>
          <p className="mt-12 max-w-[460px] text-lg leading-[1.7] text-[#625a51]">
            Статус защищенного географического указания «Долина реки Афипс» — знак места, климата и труда людей, которые создают эти вина.
          </p>
        </div>

        <div className="story-gallery">
          <figure className="story-photo story-photo-main">
            <Image
              src="/images/vineyard-story.jpg"
              alt="Виноградники Краснодарского края"
              fill
              sizes="(max-width: 1023px) 90vw, 48vw"
            />
          </figure>
          <figure className="story-photo story-photo-detail">
            <Image
              src="/images/vineyard-detail.jpg"
              alt="Ряды виноградных лоз у предгорий"
              fill
              sizes="(max-width: 1023px) 55vw, 27vw"
            />
          </figure>
          <span className="story-gallery-note">Долина реки Афипс · Кубань</span>
        </div>
      </div>
      <div className="story-ribbon overflow-hidden border-y border-[#211c19]/15 py-5">
        <div className="story-ribbon-track flex min-w-max items-center gap-8 px-5 text-lg uppercase tracking-[0.14em] text-[#6c6257] md:gap-14 md:px-10">
          <span>Ручной сбор</span><span aria-hidden="true">✳</span>
          <span>Долина реки Афипс</span><span aria-hidden="true">✳</span>
          <span>Краснодарский край</span><span aria-hidden="true">✳</span>
          <span>Пять уникальных вин</span><span aria-hidden="true">✳</span>
          <span>Ручной сбор</span>
        </div>
      </div>
    </section>
  );
}