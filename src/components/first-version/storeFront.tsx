"use client";

import Image from "next/image";
import { ArrowDownRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const SWIPE_THRESHOLD = 40;

const wines = [
  {
    name: "Ркацители–Мцване",
    type: "Сухое белое · 2024",
    image: "/images/wine-rkatsiteli.jpg",
    description:
      "Современное прочтение двух классических грузинских сортов — легкое, яркое и солнечное.",
    details: ["Мцване, Ркацители", "12–12.5%", "Подача 10–12°C"],
    purchase:
      "https://vinotheque.ru/catalog/vino/beloe/vino_rkatsiteli_mtsvane_pozovite_somele_2024_0_75_l/",
  },
  {
    name: "Сибирьковый–Пино Гри",
    type: "Сухое белое · 2024",
    image: "/images/wine-sibirkovy.jpg",
    description:
      "Свежий купаж двух сортов, созданный для легкости и чистого, минерального вкуса.",
    details: ["Сибирьковый, Пино Гри", "11%", "Подача 8–10°C"],
    purchase:
      "https://vinotheque.ru/catalog/vino/beloe/vino_sibirkovyy_pino_gri_pozovite_somele_2024_0_75_l/",
  },
  {
    name: "Каберне Фран",
    type: "Сухое красное · 2024",
    image: "/images/wine-cabernet.jpg",
    description:
      "Стильное и насыщенное красное вино с ярким сортовым характером.",
    details: ["Каберне Фран", "13%", "Подача 16–18°C"],
    purchase:
      "https://vinotheque.ru/catalog/vino/krasnoe/vino_kaberne_fran_pozovite_somele_2024_0_75_l/",
  },
  {
    name: "Каберне Фран",
    type: "Полусухое красное · 2023",
    image: "/images/wine-cabernet.jpg",
    description:
      "Мягкое, фруктовое и дружелюбное красное с ярким ягодным характером.",
    details: ["Каберне Фран, Каберне Совиньон", "14%", "Подача 16–18°C"],
    purchase:
      "https://vinotheque.ru/catalog/vino/krasnoe/vino_kaberne_fran_pozovite_somele_2023_0_75_l/",
  },
  {
    name: "Качич",
    type: "Сухое красное · 2024",
    image: "/images/wine-kachich.jpg",
    description:
      "Редкий сорт абхазского происхождения, выращенный на Кубани. Мощное, глубокое и характерное вино.",
    details: ["Саперави (Качич)", "15%", "Подача 16–18°C"],
    purchase:
      "https://vinotheque.ru/catalog/vino/krasnoe/vino_kachich_pozovite_somele_2024_0_75_l/",
  },
];

export function StoreFront() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeWine = wines[activeIndex];

  function showPreviousWine() {
    setActiveIndex((currentIndex) => (currentIndex + wines.length - 1) % wines.length);
  }

  function showNextWine() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % wines.length);
  }

  const touchStartX = useRef<number | null>(null);

  function handleTouchEnd(endX: number) {
    if (touchStartX.current === null) return;
    const deltaX = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (deltaX < 0) showNextWine();
    else showPreviousWine();
  }

  return (
    <section id="wines" className="wine-section bg-[#720005] text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
        <div className="mb-12 flex items-end justify-between gap-8 border-b border-white/30 pb-7 md:mb-16">
          <div>
            <p className="eyebrow mb-5 text-[#e5c99d]">Коллекция · 01—05</p>
            <h2 className="font-display text-[38px] font-medium uppercase leading-[0.95] md:text-[64px] lg:text-[76px]">
              Вино Позовите Сомелье
            </h2>
          </div>
          <span className="hidden text-lg text-white/70 md:block">Долина реки Афипс</span>
        </div>

        <div
          className="wine-feature"
          role="region"
          aria-roledescription="карусель"
          aria-label="Вина коллекции"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") showPreviousWine();
            if (event.key === "ArrowRight") showNextWine();
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
        >
          <div className="wine-bottle-stage">
            <Image
              key={activeWine.image}
              className="wine-bottle"
              src={activeWine.image}
              alt={`Бутылка вина «Позовите Сомелье», ${activeWine.name}`}
              fill
              sizes="(max-width: 767px) 90vw, 42vw"
            />
            <span className="wine-image-label">{String(activeIndex + 1).padStart(2, "0")}</span>
          </div>

          <div className="wine-details">
            <div className="wine-slides">
              {wines.map((wine, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={wine.purchase}
                    className={`wine-slide ${isActive ? "wine-slide-active" : ""}`}
                    aria-hidden={!isActive}
                    inert={!isActive}
                  >
                    <p className="eyebrow mb-4 text-[#e5c99d]">{wine.type}</p>
                    <h3 className="wine-name font-display font-medium">{wine.name}</h3>
                    <p className="mt-6 max-w-[470px] text-lg leading-[1.6] text-white/85 md:text-[19px]">
                      {wine.description}
                    </p>
                    <ul className="wine-facts mt-8 flex flex-wrap gap-x-7 gap-y-3 text-lg uppercase tracking-[0.05em] text-white/80">
                      {wine.details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                    <a
                      className="wine-buy mt-9 inline-flex items-center gap-5 bg-[#f15a4a] px-7 py-4 text-lg font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#d84437]"
                      href={wine.purchase}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Купить вино <ArrowDownRight size={17} aria-hidden="true" />
                    </a>
                  </div>
                );
              })}
            </div>

            <div className="wine-controls mt-12 flex items-center justify-between border-t border-white/30 pt-5">
              <div className="flex gap-2" aria-label="Выбор вина">
                {wines.map((wine, index) => (
                  <button
                    key={`${wine.name}-${wine.type}`}
                    className={`wine-dot ${index === activeIndex ? "wine-dot-active" : ""}`}
                    type="button"
                    aria-label={`Показать вино ${index + 1}: ${wine.name}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  className="wine-arrow"
                  type="button"
                  aria-label="Предыдущее вино"
                  onClick={showPreviousWine}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="wine-arrow"
                  type="button"
                  aria-label="Следующее вино"
                  onClick={showNextWine}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}