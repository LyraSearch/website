import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "../Icons";

const pages = [
  {
    name: "Docs",
    href: "https://docs.lyrajs.io",
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
    <div className="i-akar-icons:github-fill block" w="5" h="5" />
  </a>
);

export function NavBar() {
  const [mobileNavbar, setMobileNavbar] = useState(false);

  const toggleMobileNavbar = () => setMobileNavbar(!mobileNavbar);

  return (
    <div position-fixed w-full z-20 backdrop-blur-md>
      <div className="container-xl">
        <div className="flex justify-between py-6 m-auto">
          <div className="text-3xl font-bold">
            <Link href="/" passHref>
              <a>✨ Lyra</a>
            </Link>
          </div>

          <div className="flex items-center justify-end">
            <div m="auto" className="hidden" md="flex flex-row items-center">
              {pages.map((page) => (
                <Link href={page.href} passHref key={page.href}>
                  <a className="mr-4 hover:text-slate-300">{page.name}</a>
                </Link>
              ))}
            </div>

            <GitHubLink />

            <div p="l-2" flex="~ flex-col" md="hidden" container>
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
              <div  key={page.href} flex h="48px" w="full" text-base items-center font-bold className="border-bottom border-solid border-gray-2">
                <Link href={page.href} passHref flex h="48px" w="full" text-base items-center font-bold className="border-bottom border-solid border-gray-2">
                  <a className="mr-4 hover:text-slate-300">{page.name}</a>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
