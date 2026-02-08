import Header from "./Header";
import BallCursor from "../common/BallCursor";
import SEO from "../common/SEO";
import { useRef } from "react";
import Home from "../../sections/Home";
import ProductShowcase from "../../sections/ProductShowcase";
import About from "../../sections/About";
import Services from "../../sections/Services";
import Contact from "../../sections/Contact";
import { ReactLenis } from 'lenis/react'
import { useEffect } from "react";
import gsap from "gsap";
import Portfolio from "../../sections/Portfolio";

export default function Layout() {
  const ballCursorRef = useRef(null)
  const lenisRef = useRef()

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <>
      <SEO
        title="Ingecotol Ltda | Telecomunicaciones en Colombia"
        description="Ingecotol Ltda - Empresa líder en telecomunicaciones en Colombia. Más de 15 años de experiencia ofreciendo soluciones integrales en desarrollo web, CCTV, redes y mantenimiento de equipos."
        keywords="telecomunicaciones, CCTV, redes, cableado estructurado, desarrollo web, mantenimiento equipos, Colombia, Ingecotol"
        canonical="https://ingecotol.com/app"
      />
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <div className="font-family-lato min-h-dvh min-w-dvw flex flex-col overflow-x-hidden">
        {/* Skip link para accesibilidad */}
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>

        <Header />

        <main id="main-content" className="flex-grow pt-16 md:pt-20" role="main">
          <Home />
          <ProductShowcase />
          <About />
          <Services />
          <Portfolio />
        </main>

        <Contact />

        <BallCursor ref={ballCursorRef} />
      </div>
    </>
  );
}
