import Image from "next/image";

export function Terruar() {
  return (
    <section id="terroir" className="terroir-section bg-[#e6dfd2] text-[#211c19]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
        <div className="mb-16 flex flex-col justify-between gap-8 border-b border-[#211c19]/30 pb-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5 text-[#8a3027]">Место, которое формирует вкус</p>
            <h2 className="font-display text-[52px] font-medium uppercase leading-[0.9] md:text-[82px]">
              Терруар
            </h2>
          </div>
          <p className="max-w-[380px] text-lg leading-[1.7] text-[#625a51]">
            Виноградники долины Афипс — высота, ветра и почвы, собранные в характере вина.
          </p>
        </div>

        <article className="terroir-row terroir-row-first">
          <div className="terroir-number">01</div>
          <div className="terroir-copy">
            <h3>Терруар и рельеф</h3>
            <p>
              Виноградники расположены на высоте 150–200 метров над уровнем моря в Северском районе Кубани, вблизи станицы Смоленская. Открытое ветрам плато обеспечивает постоянную циркуляцию воздуха, а предгорья защищают посадки от холодных континентальных потоков.
            </p>
          </div>
          <figure className="terroir-image terroir-image-one">
            <Image
              src="/images/grape-selection.jpg"
              alt="Рельеф и виноградники в долине Афипс"
              fill
              sizes="(max-width: 767px) 90vw, 40vw"
            />
          </figure>
        </article>

        <article className="terroir-row terroir-row-second">
          <div className="terroir-number">02</div>
          <div className="terroir-copy">
            <h3>Климат и созревание</h3>
            <p>
              Климат умеренно континентальный, с выраженными суточными колебаниями температур. В сезон созревания разница между днем и ночью достигает 10 градусов: жаркое солнце сменяется прохладой ночей. Ягоды набирают гармоничную сахаристость, сохраняя яркую кислотность.
            </p>
          </div>
          <figure className="terroir-image terroir-image-two">
            <Image
              src="/images/terroir-climate.jpg"
              alt="Летний свет над виноградниками Кубани"
              fill
              sizes="(max-width: 767px) 90vw, 40vw"
            />
          </figure>
        </article>

        <article className="terroir-row terroir-row-third">
          <div className="terroir-number">03</div>
          <div className="terroir-copy">
            <h3>Ручной отбор и стиль вина</h3>
            <p>
              Каждая гроздь проходит тщательный ручной отбор. Так рождаются элегантные, сочные вина с насыщенным фруктовым профилем, где спелость и глубина вкуса сочетаются со свежей кислотностью.
            </p>
          </div>
          <figure className="terroir-image terroir-image-three">
            <Image
              src="/images/grape-harvest.jpg"
              alt="Виноград перед ручным сбором"
              fill
              sizes="(max-width: 767px) 90vw, 40vw"
            />
          </figure>
        </article>
      </div>
    </section>
  );
}