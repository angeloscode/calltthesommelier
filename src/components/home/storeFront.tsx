import Image from "next/image";
import type { CatalogWine } from "@/lib/catalog/types";

function WineFacts({ items }: { items: [string, string][] }) {
  return (
    <ul className="lp-wine-facts">
      {items.map(([label, value]) => (
        <li key={label}>
          <strong>{label}:</strong> {value}
        </li>
      ))}
    </ul>
  );
}

export function StoreFront({ wines }: { wines: CatalogWine[] }) {
  return (
    <section id="wines" className="lp-wines">
      <div className="lp-section-head">
        <h2 className="lp-container lp-display">Вино Позовите Сомелье</h2>
      </div>

      {wines.map((wine) => (
        <article key={wine.slug} className="lp-wine">
          <div className="lp-container lp-wine-grid">
            <div className="lp-wine-gallery">
              {wine.images.map((image, index) => (
                <Image
                  key={image}
                  src={image}
                  alt={
                    index === 0
                      ? `Бутылка вина «Позовите Сомелье. ${wine.name}»`
                      : `«Позовите Сомелье. ${wine.name}» среди винограда`
                  }
                  width={1680}
                  height={1200}
                  sizes="(max-width: 959px) 100vw, 760px"
                />
              ))}
            </div>

            <div className="lp-wine-info">
              <h3 className="lp-wine-title">
                Позовите Сомелье
                <br />
                {wine.name}
              </h3>
              <p className="lp-wine-category">{wine.category}</p>
              <p className="lp-wine-intro">{wine.intro}</p>
              <WineFacts items={wine.facts} />
              <WineFacts items={wine.tasting} />
              {wine.purchase && (
                <a className="lp-wine-buy" href={wine.purchase} target="_blank" rel="noopener">
                  Купить
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
