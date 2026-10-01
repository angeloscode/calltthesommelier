import Image from "next/image";

export function InfaOStatus() {
  return (
    <section id="story" className="lp-story">
      <div className="lp-story-copy">
        <p>
          Позовите Сомелье — это пять уникальных характеров из солнечного Краснодарского края
        </p>
        <p>Статус защищенного географического указания (ЗГУ) «Долина реки Афипс»</p>
      </div>

      <div className="lp-story-media">
        <figure className="lp-cover">
          <Image
            src="/images/vineyard-story.jpg"
            alt="Виноградник в долине реки Афипс"
            fill
            sizes="(max-width: 959px) 50vw, 430px"
          />
        </figure>
        <figure className="lp-cover">
          <Image
            src="/images/vineyard-detail.jpg"
            alt="Грозди белого винограда"
            fill
            sizes="(max-width: 959px) 50vw, 430px"
          />
        </figure>
      </div>
    </section>
  );
}
