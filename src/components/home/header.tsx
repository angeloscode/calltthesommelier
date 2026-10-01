import Image from "next/image";

export function Header() {
  return (
    <header className="lp-header">
      <div className="lp-container">
        <a className="lp-logo" href="#top" aria-label="Позовите Сомелье, наверх страницы">
          <Image
            src="/images/brand-mark.svg"
            alt="Позовите Сомелье"
            width={169}
            height={73}
            preload
          />
        </a>
      </div>
    </header>
  );
}
