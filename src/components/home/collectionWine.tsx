import Image from "next/image";

export function CollectionWine() {
  return (
    <section className="lp-hero" aria-labelledby="hero-title">
      <div className="lp-hero-head">
        <h1 id="hero-title" className="lp-container lp-display">
          Коллекция вин
          <br />
          Позовите Сомелье
        </h1>
      </div>

      <div className="lp-hero-body">
        <div className="lp-hero-media">
          <figure className="lp-cover">
            <Image
              src="/images/hero-bottles.jpg"
              alt="Пять бутылок вина «Позовите Сомелье»"
              fill
              preload
              sizes="(max-width: 959px) 100vw, 640px"
            />
          </figure>
        </div>
        <div className="lp-hero-copy lp-lead">
          <p>Коллекция российских вин, созданная в Краснодарском крае, в долине реки Афипс.</p>
          <p>
            Каждое вино — результат ручного сбора и внимательной работы с сортами, которые
            раскрывают потенциал терруара.
          </p>
        </div>
      </div>
    </section>
  );
}
