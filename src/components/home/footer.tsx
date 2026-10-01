export function Footer() {
  return (
    <footer id="contacts" className="lp-footer">
      <div className="lp-footer-brand">
        <a className="lp-footer-name" href="#top">
          Позовите Сомелье
        </a>
        <p className="lp-footer-tagline">Российское вино · Долина реки Афипс · Краснодарский край</p>
        <p className="lp-footer-copy">© {new Date().getFullYear()} Позовите Сомелье</p>
      </div>
      <div className="lp-footer-aside" aria-hidden="true" />
    </footer>
  );
}
