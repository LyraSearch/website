import s from "./navbar.module.css";

import { useState } from "react";
import cn from "classnames";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { Container } from "../Container";
import { MenuIcon } from "../Icons";

const pages = [
  {
    name: "Docs",
    href: "https://nearform.github.io/lyra",
    external: true,
  },
  {
    name: "Live demo",
    href: "/demo",
  },
  {
    name: "Benchmarks",
    href: "/benchmarks",
  },
  {
    name: "Contribute",
    href: "/contribute",
  },
];

const GitHubLink = () => (
  <a
    href="https://github.com/nearform/lyra"
    target="_blank"
    rel="noreferrer"
    className="hover:text-slate-300"
  >
    <AiFillGithub className="w-5 h-5" />
  </a>
);

export function NavBar() {
  const [mobileNavbar, setMobileNavbar] = useState(false);

  const toggleMobileNavbar = () => setMobileNavbar(!mobileNavbar);

  return (
    <div className={s.navbar}>
      <Container>
        <div className="flex justify-between py-6 m-auto">
          <div className="text-3xl font-bold">
            <Link href="/" passHref>
              <a>✨ Lyra</a>
            </Link>
          </div>

          <div className="flex items-center justify-end">
            <div className={s.desktopNavbar}>
              {pages.map((page) => (
                <Link href={page.href} passHref key={page.href}>
                  <a className="mr-4 hover:text-slate-300">{page.name}</a>
                </Link>
              ))}
            </div>

            <GitHubLink />

            <div className={s.mobileNavbar}>
              <button onClick={toggleMobileNavbar} aria-label="Toggle Menu">
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileNavbar && (
          <div className="flex flex-col transition-all duration-300">
            {pages.map((page) => (
              <div className={s.menuLink} key={page.href}>
                <Link href={page.href} passHref className={s.menuLink}>
                  <a className="mr-4 hover:text-slate-300">{page.name}</a>
                </Link>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
