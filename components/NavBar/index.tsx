import Link from "next/link"
import { AiFillGithub } from 'react-icons/ai';
import { Container } from "../Container";

const pages = [
  {
    name: "Docs",
    href: "https://nearform.github.io/lyra",
    external: true
  },
  {
    name: "Live demo",
    href: "/demo",
  },
  {
    name: "Fast",
    href: "/fast",
  },
  {
    name: "Benchmarks",
    href: "/benchmarks",
  },
  {
    name: "Contribute",
    href: "/contribute",
  }
];

export function NavBar() {
  return (
    <div className="fixed z-20 w-full backdrop-blur-sm">
      <Container>
        <div className="flex justify-between py-6 m-auto">
          <div className="text-3xl font-bold">
            <Link href='/' passHref>
              <a>
                ✨ Lyra
              </a>
            </Link>
          </div>

          <div className="flex items-center">
            {
              pages.map(page => (
                <Link href={page.href} passHref key={page.href}>
                  <a className="mr-4 hover:text-slate-300">
                    {page.name}
                  </a>
                </Link>
              ))
            }

            <a href="https://github.com/nearform/lyra" target="_blank" rel="noreferrer" className="hover:text-slate-300">
              <AiFillGithub className="w-5 h-5" />
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}