import gsap from "gsap";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useGSAP(() => {
    // Animación de entrada del header
    gsap.from("#header-bar", {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
  }, [])

  useGSAP(() => {
    const mobileMenu = document.getElementById("mobile-menu")

    if (isMenuOpen) {
      gsap.to(mobileMenu, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      })
    } else {
      gsap.to(mobileMenu, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      })
    }
  }, [isMenuOpen])

  const navItems = [
    { href: "#home-section", content: "Inicio", type: "anchor" },
    { href: "#about-section", content: "Nosotros", type: "anchor" },
    { href: "#services-section", content: "Servicios", type: "anchor" },
    { href: "#portfolio-section", content: "Ingecotol FC", type: "anchor" },
    { to: "/tienda", content: "Tienda", type: "link" },
    { href: "#contact-section", content: "Contacto", type: "anchor" },
  ]

  return (
    <header id="header-bar" className="fixed top-0 left-0 right-0 z-100 bg-[#0A2342]/95 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between h-16 md:h-20 pr-4 md:pr-6">
        {/* Logo - pegado a la izquierda */}
        <a href="#home-section" className="flex items-center h-full">
          <img
            src="/images/Logo ingecotol.png"
            alt="Logo Ingecotol"
            className="h-50 md:h-45 w-auto object-contain ml-2"
          />
        </a>

        {/* Navegación Desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item, index) => (
            <div key={index} className="relative">
              {item.type === "anchor" ? (
                <a
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
                >
                  {item.content}
                </a>
              ) : (
                <Link
                  to={item.to}
                  className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
                >
                  {item.content}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Botón CTA Desktop */}
        <a
          href="#contact-section"
          className="hidden lg:block px-5 py-2 bg-[#DC3545] hover:bg-[#A02128] text-white text-sm font-semibold rounded transition-colors duration-200"
        >
          Cotizar
        </a>

        {/* Botón Menú Mobile */}
        <button
          id="menu-button"
          className="lg:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Menú Mobile */}
      <nav
        id="mobile-menu"
        className="lg:hidden overflow-hidden bg-[#0A2342] border-t border-white/10"
        style={{ height: 0, opacity: 0 }}
      >
        <ul className="px-4 py-4 space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              {item.type === "anchor" ? (
                <a
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors font-medium"
                >
                  {item.content}
                </a>
              ) : (
                <Link
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors font-medium"
                >
                  {item.content}
                </Link>
              )}
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contact-section"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 bg-[#DC3545] hover:bg-[#A02128] text-white text-center font-semibold rounded-md transition-colors"
            >
              Cotizar Ahora
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
