import Image from "next/image";

export function VineyardGallery() {
  return (
    <section className="lp-gallery" aria-label="Виноградники">
      <div className="lp-gallery-top">
        <figure className="lp-cover lp-gallery-wide">
          <Image
            src="/images/vineyard-sunset.jpg"
            alt="Ряды лоз на склоне с видом на предгорья"
            fill
            sizes="(max-width: 639px) 100vw, 50vw"
          />
        </figure>
        <figure className="lp-cover lp-gallery-tall">
          <Image
            src="/images/terroir-climate.jpg"
            alt="Гроздь красного винограда на лозе"
            fill
            sizes="(max-width: 639px) 70vw, 540px"
          />
        </figure>
      </div>

      <div className="lp-gallery-bottom">
        <figure className="lp-cover lp-gallery-tractor">
          <Image
            src="/images/terroir-relief.jpg"
            alt="Трактор между рядами виноградника"
            fill
            sizes="(max-width: 959px) 60vw, 390px"
          />
        </figure>
        <div className="lp-gallery-crate-cell">
          <figure className="lp-cover lp-gallery-crate">
            <Image
              src="/images/vineyard-ridge.jpg"
              alt="Ящик с собранным белым виноградом"
              fill
              sizes="(max-width: 959px) 40vw, 264px"
            />
          </figure>
        </div>
        <p className="lp-gallery-copy lp-lead">
          Виноградники расположены на высоте 150–200 метров над уровнем моря в Северском районе
          Кубани, вблизи станицы Смоленская, в долине реки Афипс. Климат умеренно
          континентальный, с большими перепадами температур, чем на побережье, зимой иногда
          бывают довольно сильные морозы.
        </p>
      </div>
    </section>
  );
}
