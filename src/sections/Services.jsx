import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useMediaQuery } from "react-responsive"

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  useGSAP(() => {
    let endTrigger = isMobile ? "center bottom" : "bottom bottom"

    const tl = gsap.timeline({
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#services-section",
        start: "top bottom",
        end: endTrigger,
        scrub: true,
      }
    })

    tl
      .from("#services-text", {
        y: 200,
        alpha: 0,
        duration: 1.5,
      })

    if (!isMobile) {
      tl.from("#container-bars span", {
        x: 250,
        alpha: 0,
        stagger: 0.2,
        duration: 1.5,
      }, "<")
        .from("#container-bars img", {
          alpha: 0,
          duration: 1.5,
        }, "<")
    } else {
      tl.from("#container-bars img", {
        y: 200,
        alpha: 0,
        duration: 1.5,
      }, "<")
    }
  }, [])

  return (
    <section id="services-section" className="min-h-96 px-5 md:px-0 md:pl-5 overflow-hidden mb-0 py-20 flex flex-col font-family-lato bg-[#E8EEF2]" aria-labelledby="services-heading">
      <div className="relative flex-2 flex flex-col lg:flex-row gap-8">
        <div id="services-text" className="md:ml-10 flex-2 font-family-lato flex justify-center flex-col">
          <h2 id="services-heading" className="text-7xl md:text-9xl font-family-oswald line-through text-[#0A2342]">Servicios</h2>
          <div className="max-w-5xl md:mt-10">
            {/* Primera fila - 3 servicios */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              {/* Desarrollo Web */}
              <article className="service-card border-t-8 p-4 border-[#4A90E2] bg-white hover:shadow-lg transition-shadow">
                <svg className="size-10 mb-3 text-[#2f5597]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10 10.5 8 13l2 2.5" /><path d="m14 10.5 2 2.5-2 2.5" />
                  <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />
                </svg>
                <h3 className="font-extrabold pb-2 text-[#0A2342] text-lg">Desarrollo Web</h3>
                <p className="text-sm text-[#4A5568]">Sitios web modernos, responsivos y optimizados con las últimas tecnologías frontend.</p>
              </article>

              {/* CCTV */}
              <article className="service-card border-t-8 p-4 border-[#4A90E2] bg-white hover:shadow-lg transition-shadow">
                <svg className="size-10 mb-3 text-[#2f5597]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 3h5v5"/><path d="M8 3H3v5"/>
                  <path d="M21 3l-6 6"/><path d="M3 3l6 6"/>
                  <path d="M3 16v5h5"/><path d="M21 21l-6-6"/><path d="M3 21l6-6"/>
                  <path d="M16 21h5v-5"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <h3 className="font-extrabold pb-2 text-[#0A2342] text-lg">CCTV y Videovigilancia</h3>
                <p className="text-sm text-[#4A5568]">Instalación y configuración de circuitos cerrados de televisión para seguridad residencial y empresarial.</p>
              </article>

              {/* Mantenimiento */}
              <article className="service-card border-t-8 p-4 border-[#4A90E2] bg-white hover:shadow-lg transition-shadow">
                <svg className="size-10 mb-3 text-[#2f5597]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/>
                  <path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/>
                </svg>
                <h3 className="font-extrabold pb-2 text-[#0A2342] text-lg">Mantenimiento de Equipos</h3>
                <p className="text-sm text-[#4A5568]">Servicio técnico para computadores e impresoras en instituciones educativas y público general.</p>
              </article>
            </div>

            {/* Segunda fila - 2 servicios centrados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:max-w-2xl md:mx-auto">
              {/* Venta de productos */}
              <article className="service-card border-t-8 p-4 border-[#4A90E2] bg-white hover:shadow-lg transition-shadow">
                <svg className="size-10 mb-3 text-[#2f5597]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
                <h3 className="font-extrabold pb-2 text-[#0A2342] text-lg">Venta de Tecnología</h3>
                <p className="text-sm text-[#4A5568]">Productos tecnológicos e innovadores: equipos de redes, seguridad, cableado y más.</p>
              </article>

              {/* Redes y WiFi */}
              <article className="service-card border-t-8 p-4 border-[#4A90E2] bg-white hover:shadow-lg transition-shadow">
                <svg className="size-10 mb-3 text-[#2f5597]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/>
                  <path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>
                </svg>
                <h3 className="font-extrabold pb-2 text-[#0A2342] text-lg">Redes y Conectividad</h3>
                <p className="text-sm text-[#4A5568]">Diseño, instalación y configuración de redes LAN, WiFi empresarial y cableado estructurado.</p>
              </article>
            </div>
          </div>
        </div>
        <div id="container-bars" className="hidden lg:flex relative justify-center flex-1 pointer-events-none overflow-hidden min-h-[400px]">
          <span className="absolute bottom-0 right-0 top-0 h-10 w-lg bg-[#2f5597]"></span>
          <span className="absolute transform top-4/11 right-0 h-27 w-md bg-[#2f5597]"></span>
          <span className="absolute bottom-0 right-0 h-6 w-lg bg-[#2f5597]"></span>
          <div className="absolute bottom-0 right-0">
            <img src="/images/part-1-about.png" alt="Servicios Ingecotol" className="max-h-[500px] w-auto object-contain" />
          </div>
        </div>
      </div>
    </section>
  )
}
