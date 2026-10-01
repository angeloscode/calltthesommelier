import Image from "next/image";
import { historySteps } from "@/lib/content/history";

export function History() {
  return (
    <section id="history" className="history-section bg-[#f0ece2] text-[#211c19]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
        <div className="mb-16 flex flex-col justify-between gap-8 border-b border-[#211c19]/30 pb-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5 text-[#8a3027]">Как появилась коллекция</p>
            <h2 className="font-display text-[52px] font-medium uppercase leading-[0.9] md:text-[82px]">
              История
            </h2>
          </div>
          <p className="max-w-[380px] text-lg leading-[1.7] text-[#625a51]">
            От идеи и поиска терруара до вина, которое хочется рекомендовать каждому.
          </p>
        </div>

        <ol className="history-grid">
          {historySteps.map((step) => (
            <li key={step.number} className="history-step">
              <span className="history-number" aria-hidden="true">{step.number}</span>
              {step.image && (
                <figure className="history-image">
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="(max-width: 767px) 90vw, 45vw"
                  />
                </figure>
              )}
              <h3 className="history-title">{step.title}</h3>
              {step.paragraphs.map((paragraph) => (
                <p key={paragraph} className="history-text">{paragraph}</p>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
