import Image from "next/image";
import { historySteps } from "@/lib/content/history";

export function History() {
  return (
    <section id="history" className="lp-history">
      <div className="lp-section-head lp-section-head--line">
        <h2 className="lp-container lp-display">История</h2>
      </div>

      <div className="lp-history-grid">
        {historySteps.map((step, index) => {
          const figure = step.image ? (
            <figure className="lp-cover lp-history-media">
              <Image
                src={step.image.src}
                alt={step.image.alt}
                fill
                sizes="(max-width: 639px) 100vw, 540px"
              />
            </figure>
          ) : null;

          return (
            <article key={step.number} className={`lp-history-step lp-history-step--${index + 1}`}>
              <span className="lp-history-number" aria-hidden="true">{step.number}</span>
              <div className="lp-history-body">
                {!step.imageAfterText && figure}
                <h3>{step.title}</h3>
                {step.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {step.imageAfterText && figure}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
