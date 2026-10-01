export function Footer() {
  return (
    <footer id="contacts" className="site-footer bg-[#211c19] text-[#f0ece2]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-10 lg:px-16">
        <div>
          <a className="font-display text-lg uppercase tracking-[0.12em]" href="#top">
            Позовите Сомелье
          </a>
          <p className="mt-3 text-lg text-white/70">
            Российское вино · Долина реки Афипс · Краснодарский край
          </p>
        </div>
        <div className="flex items-end justify-between gap-8 md:justify-end">
          <p className="text-lg uppercase tracking-[0.08em] text-white/70">
            © 2026 Позовите Сомелье
          </p>
          <a className="footer-top-link" href="#top" aria-label="Наверх">↑</a>
        </div>
      </div>
    </footer>
  );
}