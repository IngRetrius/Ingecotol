import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  useGSAP(() => {
    const tl = gsap.timeline({
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#about-section",
        start: "top bottom",
        end: "center bottom",
        scrub: true,
      },
    })

    tl
      .from(".stat-item", {
        y: 200,
        alpha: 0,
        stagger: 0.2,
        duration: 1.5,
      })
      .from("#about-description", {
        y: 100,
        alpha: 0,
        duration: 1.5,
      }, "<0.5")
  }, [])

  return (
    <section id="about-section" className="relative min-h-dvh flex flex-col justify-center py-24 px-5 lg:px-20 overflow-hidden select-none bg-white" aria-labelledby="about-heading">
      <h2 id="about-heading" className="sr-only">Sobre Ingecotol - Nuestras cifras y trayectoria</h2>
      {/* Cifras impactantes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-20" role="list" aria-label="Estadísticas de la empresa">
        {/* Instituciones educativas */}
        <article className="stat-item text-center p-6 md:p-10" role="listitem">
          <div className="font-family-oswald text-[8rem] md:text-[12rem] lg:text-[14rem] font-bold text-[#DC3545] leading-none tracking-tight" aria-hidden="true">
            +20
          </div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0A2342] mt-2">
            Instituciones Educativas
          </h3>
          <p className="mt-2 text-base md:text-lg text-[#4A5568]">
            <span className="sr-only">Más de 20</span> en la ciudad respaldan nuestro trabajo
          </p>
        </article>

        {/* Años de experiencia */}
        <article className="stat-item text-center p-6 md:p-10" role="listitem">
          <div className="font-family-oswald text-[8rem] md:text-[12rem] lg:text-[14rem] font-bold text-[#2f5597] leading-none tracking-tight" aria-hidden="true">
            15
          </div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0A2342] mt-2">
            Años de Experiencia
          </h3>
          <p className="mt-2 text-base md:text-lg text-[#4A5568]">
            <span className="sr-only">15 años</span> brindando soluciones tecnológicas
          </p>
        </article>

        {/* Clientes satisfechos */}
        <article className="stat-item text-center p-6 md:p-10" role="listitem">
          <div className="font-family-oswald text-[8rem] md:text-[12rem] lg:text-[14rem] font-bold text-[#DC3545] leading-none tracking-tight" aria-hidden="true">
            +300
          </div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0A2342] mt-2">
            Clientes Satisfechos
          </h3>
          <p className="mt-2 text-base md:text-lg text-[#4A5568]">
            <span className="sr-only">Más de 300 clientes</span> confían en nuestros servicios
          </p>
        </article>
      </div>

      {/* Descripción */}
      <div id="about-description" className="max-w-4xl mx-auto text-center">
        <p className="text-lg md:text-xl lg:text-2xl text-[#4A5568] leading-relaxed">
          <span className="text-[#0A2342] font-bold">Ingecotol ltda</span> es una empresa especializada en ingeniería y telecomunicaciones.
          Nuestro enfoque se centra en la excelencia profesional, donde cada proyecto se ejecuta con precisión y compromiso con la calidad.
        </p>
      </div>
    </section>
  )
}
