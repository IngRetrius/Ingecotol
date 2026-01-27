import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import SlideButton from "../components/common/SlideButton"

export default function Home() {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } })

    tl.from('#first-title', {
      x: -50,
      alpha: 0,
      duration: 1,
    })
      .from('#second-title', {
        x: 50,
        alpha: 0,
        duration: 1,
      }, "<")
      .from('#body-text', {
        x: -50,
        alpha: 0,
        duration: 1,
      }, "<")
      .from('#top-bar', {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
      }, "<")
      .from('#bottom-bar', {
        scaleX: 0,
        transformOrigin: "right",
        duration: 1,
      }, "<")
  }, [])

  return (
    <section id="home-section" className="h-dvh grid place-content-center" aria-labelledby="main-heading">
      <h1 id="main-heading" className="sr-only">Ingecotol Ltda - Ingeniería Civil y Telecomunicaciones en Colombia</h1>
      <div className="px-5 grid grid-cols-1 lg:grid-cols-2 grid-rows-3 lg:grid-rows-2 lg:gap-x-20">
        <div className="font-family-oswald col-start-1 row-start-1 flex justify-center lg:justify-start items-end select-none">
          <span id="first-title" aria-hidden="true" className="text-8xl lg:text-[13rem] whitespace-nowrap tracking-wide leading-none text-[#0A2342]">Ingecotol</span>
        </div>
        <div className="font-family-lato lg:col-start-2 lg:row-start-1 flex justify-center lg:justify-start items-start lg:items-end">
          <div className="flex flex-col justify-center w-md">
            <div id="top-bar" className="h-4 mb-5" style={{background: 'linear-gradient(90deg, #0A2342 0%, #2f5597 100%)'}}></div>
            <a id="body-text" className="font-family-lato text-center text-md cursor-crosshair text-[#4A5568]" href="#services-section">
              <SlideButton secondContent="Conoce nuestros servicios" style={{ borderBottom: "0" }} content="Ingeniería y telecomunicaciones. Experiencia, calidad y variedad a su servicio. Ofrecemos soluciones integrales para sus proyectos técnicos y de infraestructura." />
            </a>
            <div id="bottom-bar" className="h-4 mt-5" style={{background: 'linear-gradient(90deg, #2f5597 0%, #0A2342 100%)'}}></div>
          </div>
        </div>
        <div className="mt-5 font-family-oswald lg:col-span-2 col-start-1 row-start-2 flex justify-center lg:justify-start items-start select-none text-center lg:text-left">
          <span id="second-title" aria-hidden="true" className="text-7xl lg:text-[11rem] lg:whitespace-nowrap line-through tracking-wide leading-none pb-5 md:pb-0 text-[#2f5597]">construyendo futuro</span>
        </div>
      </div>
    </section>
  )
}
