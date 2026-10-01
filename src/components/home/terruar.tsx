import Image from "next/image";

const terroirRows = [
  {
    number: "01",
    title: "Терруар и рельеф",
    text: "Виноградники расположены на высоте 150–200 метров над уровнем моря. Открытое ветрам плато обеспечивает постоянную циркуляцию воздуха, а предгорья надежно защищают посадки от холодных континентальных потоков. Почвы здесь преимущественно серые лесные, встречаются участки железистых глин, каменистые зоны, песчаники и мергель. Их природная бедность создает условия, в которых лоза формирует небольшой, но концентрированный урожай. Основные насаждения были заложены в 2012–2014 годах с плотностью 5100 лоз на гектар — это помогает поддерживать оптимальный баланс между силой роста и качеством ягод.",
    image: "/images/grape-selection.jpg",
    alt: "Панорама виноградника на плато у предгорий",
  },
  {
    number: "02",
    title: "Климат и созревание",
    text: "Климат умеренно континентальный, с выраженными суточными колебаниями температур. В сезон созревания разница между днем и ночью достигает 10 градусов: жаркое солнце сменяется прохладой ночей. Такой природный контраст позволяет ягодам набирать гармоничную сахаристость, сохраняя яркую кислотность и выразительный сортовой характер.",
    image: "/images/vineyard-detail-portrait.jpg",
    alt: "Спелые грозди белого винограда",
  },
  {
    number: "03",
    title: "Ручной отбор и стиль вина",
    text: "Каждая гроздь проходит тщательный ручной отбор — именно такое внимание к деталям определяет будущую чистоту и стиль вина. Результат — элегантные, сочные вина с насыщенным фруктовым профилем, где спелость и глубина вкуса гармонично сочетаются со свежей кислотностью и благородной структурой.",
    image: "/images/grape-harvest.jpg",
    alt: "Гроздь винограда в руке сборщика",
  },
];

export function Terruar() {
  return (
    <section id="terroir" className="lp-terroir">
      <div className="lp-section-head lp-section-head--line">
        <h2 className="lp-container lp-display">Терруар</h2>
      </div>

      {terroirRows.map((row, index) => (
        <article
          key={row.number}
          className={index % 2 ? "lp-terroir-row lp-terroir-row--reverse" : "lp-terroir-row"}
        >
          <div className="lp-container lp-terroir-grid">
            <span className="lp-terroir-number" aria-hidden="true">{row.number}</span>
            <h3 className="lp-terroir-title">{row.title}</h3>
            <p className="lp-terroir-text">{row.text}</p>
            <figure className="lp-cover lp-terroir-media">
              <Image src={row.image} alt={row.alt} fill sizes="(max-width: 959px) 100vw, 426px" />
            </figure>
          </div>
        </article>
      ))}
    </section>
  );
}
