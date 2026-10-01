"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header absolute inset-x-0 top-0 z-30 text-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10 lg:px-16">
        <a
          className="brand-mark"
          href="#top"
          aria-label="Позовите Сомелье, на главную"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/images/brand-mark.svg"
            alt="Логотип винной коллекции"
            width={169}
            height={73}
            preload
            className="h-auto w-[135px] md:w-[169px]"
          />
        </a>

        <nav
          className={`${menuOpen ? "site-nav site-nav-open" : "site-nav"}`}
          aria-label="Основная навигация"
        >
          <a href="#story" onClick={() => setMenuOpen(false)}>Коллекция</a>
          <a href="#terroir" onClick={() => setMenuOpen(false)}>Терруар</a>
          <a href="#wines" onClick={() => setMenuOpen(false)}>Вина</a>
          <a href="#contacts" onClick={() => setMenuOpen(false)}>Контакты</a>
        </nav>

        <button
          className="site-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}