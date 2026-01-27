import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router"

export default function Portfolio() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef(null)

  // Imágenes del carrusel
  const carouselImages = [
    {
      src: "/images/fc/Equipo.jpeg",
      alt: "Equipo Ingecotol FC"
    },
    {
      src: "/images/fc/Equipo2.jpeg",
      alt: "Equipo Ingecotol FC"
    },
    {
      src: "/images/fc/Equipo3.jpeg",
      alt: "Equipo Ingecotol FC"
    },
    {
      src: "/images/fc/Final.png",
      alt: "Final del torneo"
    },
    {
      src: "/images/fc/Reconocimiento.png",
      alt: "Reconocimiento del equipo"
    }
  ]

  // Auto-avance del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [carouselImages.length])

  useGSAP(() => {
    const tl = gsap.timeline({
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#portfolio-section",
        start: "top bottom",
        end: "center bottom",
        scrub: true,
      }
    })

    tl
      .from('#portfolio-title', {
        y: 200,
        alpha: 0,
        duration: 1.5,
      })
      .from('#team-logo', {
        y: 200,
        alpha: 0,
        duration: 1.5,
      }, "<")
      .from('#carousel-container', {
        y: 200,
        alpha: 0,
        duration: 1.5,
      }, "<")
      .from('#promo-section', {
        y: 200,
        alpha: 0,
        duration: 1.5,
      }, "<")
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  return (
    <section id="portfolio-section" className="min-h-screen px-5 py-16 md:px-10 lg:px-14 flex flex-col justify-center bg-white">
      {/* Título principal */}
      <h2 id="portfolio-title" className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-family-oswald line-through mb-8 text-[#0A2342] text-center">
        Ingecotol FC
      </h2>

      {/* Eslogan principal */}
      <div className="text-center mb-12">
        <p className="text-2xl md:text-3xl font-family-oswald text-[#0A2342]">
          Jugamos limpio, <span className="text-[#DC3545]">conectamos mejor</span>
        </p>
      </div>

      {/* Grid de 3 columnas */}
      <div className="max-w-8xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

        {/* Columna izquierda - Logo */}
        <div id="team-logo" className="flex justify-center items-center">
          <img
            src="/images/Logo Ingecotol FC 2d.png"
            alt="Ingecotol FC"
            className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 2xl:w-[28rem] 2xl:h-[28rem] object-contain"
          />
        </div>

        {/* Columna central - Carrusel */}
        <div id="carousel-container" className="relative">
          <div
            ref={carouselRef}
            className="relative overflow-hidden rounded-xl shadow-2xl"
            style={{ aspectRatio: '4/3' }}
          >
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Controles del carrusel */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#0A2342]/80 hover:bg-[#0A2342] text-white p-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0A2342]/80 hover:bg-[#0A2342] text-white p-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-[#DC3545]' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha - Promoción */}
        <div id="promo-section" className="flex flex-col justify-center text-center lg:text-left px-4">
          <p className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-family-oswald font-bold text-[#0A2342] leading-tight mb-6">
            <span className="text-[#DC3545]">10%</span> de descuento
          </p>
          <p className="text-xl md:text-2xl text-[#4A5568] leading-relaxed">
            Para todos los <strong className="text-[#0A2342]">maestros participantes</strong> del torneo
          </p>
          <p className="text-2xl md:text-3xl font-family-oswald text-[#2f5597] mt-4">
            "Sergio Enrique Cortés"
          </p>
          <p className="text-lg text-[#4A5568] mt-6">
            Válido en toda la tienda Ingecotol
          </p>
          <Link
            to="/tienda"
            className="mt-6 inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#DC3545] hover:bg-[#A02128] text-white font-semibold rounded-lg transition-colors text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            Ir a la Tienda
          </Link>
        </div>
      </div>
    </section>
  )
}
