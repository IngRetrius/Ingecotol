import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { products } from "../data/products";

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-avance del carrusel cada 5 segundos
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Animaciones GSAP con ScrollTrigger
  useGSAP(() => {
    const tl = gsap.timeline({
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#product-showcase-section",
        start: "top bottom",
        end: "center bottom",
        scrub: true,
      },
    });

    tl.from("#showcase-title", {
      x: -100,
      alpha: 0,
      duration: 1.5,
    })
      .from(
        "#product-carousel",
        {
          y: 100,
          alpha: 0,
          scale: 0.95,
          duration: 1.5,
        },
        "<0.2"
      )
      .from(
        "#showcase-cta",
        {
          x: 100,
          alpha: 0,
          duration: 1.5,
        },
        "<0.2"
      );
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const currentProduct = products[currentSlide];

  return (
    <section
      id="product-showcase-section"
      className="py-16 lg:py-20 px-5 md:px-10 lg:px-14 flex flex-col justify-center bg-[#E8EEF2]"
      aria-labelledby="showcase-heading"
      aria-roledescription="carrusel de productos destacados"
    >
      {/* Heading oculto para accesibilidad */}
      <h2 id="showcase-heading" className="sr-only">
        Productos destacados de nuestra tienda
      </h2>

      {/* Live region para anuncios de cambio de slide */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Mostrando ${currentProduct.name}, producto ${currentSlide + 1} de ${products.length}`}
      </div>

      {/* Grid principal */}
      <div className="max-w-[90rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 xl:gap-20 items-center">
        {/* Columna izquierda - Título */}
        <div id="showcase-title" className="text-center lg:text-left">
          <span className="text-sm lg:text-base xl:text-lg font-semibold text-[#DC3545] uppercase tracking-wider">
            Nuestra Tienda
          </span>
          <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-family-oswald text-[#0A2342] mt-2 leading-tight">
            Productos{" "}
            <span className="text-[#2f5597] line-through">Destacados</span>
          </h3>
          <p className="text-lg lg:text-xl xl:text-2xl text-[#4A5568] mt-4 max-w-md lg:max-w-lg mx-auto lg:mx-0">
            Tecnología de calidad seleccionada para ti
          </p>
        </div>

        {/* Columna central - Carrusel */}
        <div
          id="product-carousel"
          className="relative lg:scale-110 xl:scale-115 2xl:scale-120 origin-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
            {/* Imagen del producto */}
            <div className="aspect-[4/3] md:aspect-square lg:aspect-[4/3] relative">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentSlide
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} - ${product.category}`}
                    className="w-full h-full object-contain p-8"
                  />
                </div>
              ))}
            </div>

            {/* Info del producto */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A2342] to-transparent p-4 pt-12">
              <span className="text-[#DC3545] text-xs font-semibold uppercase tracking-wider">
                {currentProduct.category}
              </span>
              <h4 className="text-white text-lg font-family-oswald font-bold mt-0.5">
                {currentProduct.name}
              </h4>
              <span className="text-[#4A90E2] text-base font-bold">
                {currentProduct.price}
              </span>
            </div>

            {/* Controles de navegación */}
            <button
              onClick={prevSlide}
              aria-label="Producto anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#0A2342]/80 hover:bg-[#0A2342] text-white p-2 rounded-full transition-all hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Siguiente producto"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0A2342]/80 hover:bg-[#0A2342] text-white p-2 rounded-full transition-all hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Indicadores (dots) */}
          <div
            className="flex justify-center gap-2 lg:gap-3 mt-4 lg:mt-6"
            role="tablist"
            aria-label="Navegación de productos"
          >
            {products.map((product, index) => (
              <button
                key={product.id}
                role="tab"
                aria-selected={currentSlide === index}
                aria-label={`Ir al producto ${index + 1}: ${product.name}`}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 lg:h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-[#DC3545] w-8 lg:w-10"
                    : "bg-[#CBD5E0] hover:bg-[#4A90E2] w-3 lg:w-4"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Columna derecha - CTA */}
        <div id="showcase-cta" className="text-center lg:text-left">
          <p className="text-lg lg:text-xl xl:text-2xl text-[#4A5568] mb-6 lg:mb-8 max-w-xs lg:max-w-sm mx-auto lg:mx-0">
            Descubre nuestra selección de{" "}
            <span className="text-[#0A2342] font-semibold">
              tecnología de calidad
            </span>{" "}
            a precios accesibles
          </p>
          <Link
            to="/tienda"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 lg:px-10 lg:py-5 bg-[#DC3545] hover:bg-[#A02128] text-white font-semibold rounded-lg transition-all duration-300 text-lg lg:text-xl shadow-lg hover:shadow-xl hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:scale-110 lg:w-7 lg:h-7"
              aria-hidden="true"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            Explorar Tienda
          </Link>
          <p className="text-sm lg:text-base text-[#4A90E2] mt-4 lg:mt-6">Envíos a toda Colombia</p>
        </div>
      </div>
    </section>
  );
}
