import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import BallCursor from "../components/common/BallCursor";
import SEO from "../components/common/SEO";
import { useCart } from "../context/CartContext";
import Cart from "../components/cart/Cart";
import CartIcon from "../components/cart/CartIcon";
import CartNotification from "../components/cart/CartNotification";
import { products } from "../data/products";

// Componente Modal con Carrusel
function ProductModal({ product, onClose, onAddToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const modalRef = useRef(null);

  // Total de items: imágenes + video (si existe)
  const totalItems = product.images ? product.images.length + (product.video ? 1 : 0) : 1;
  const isVideo = product.video && currentIndex === product.images?.length;

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Animación de entrada
  useLayoutEffect(() => {
    gsap.fromTo(modalRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
    );
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div ref={modalRef} className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-2xl">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>

        {/* Carrusel */}
        <div className="relative aspect-video bg-[#0A2342] flex items-center justify-center" role="region" aria-label="Galería de imágenes del producto">
          {isVideo ? (
            <video
              src={product.video}
              controls
              autoPlay
              className="w-full h-full object-contain"
              aria-label={`Video de ${product.name}`}
            />
          ) : (
            <img
              src={product.images?.[currentIndex] || product.image}
              alt={`${product.name} - Imagen ${currentIndex + 1} de ${totalItems}`}
              className="w-full h-full object-contain"
            />
          )}

          {/* Flechas de navegación */}
          {totalItems > 1 && (
            <>
              <button
                onClick={goToPrev}
                aria-label="Imagen anterior"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-[#0A2342] rounded-full shadow-lg transition-all hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              <button
                onClick={goToNext}
                aria-label="Siguiente imagen"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-[#0A2342] rounded-full shadow-lg transition-all hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </>
          )}

          {/* Indicador de video */}
          {isVideo && (
            <div className="absolute top-4 left-4 bg-[#DC3545] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Video
            </div>
          )}
        </div>

        {/* Miniaturas */}
        {totalItems > 1 && (
          <div className="flex gap-2 p-4 bg-[#E8EEF2] overflow-x-auto">
            {product.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  currentIndex === index ? 'border-[#DC3545] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Miniatura ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
            {product.video && (
              <button
                onClick={() => setCurrentIndex(product.images?.length || 0)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all bg-[#0A2342] flex items-center justify-center ${
                  isVideo ? 'border-[#DC3545] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Info del producto */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-sm text-[#4A90E2] font-semibold">{product.category}</span>
              <h2 id="modal-product-title" className="text-2xl font-bold text-[#0A2342] mt-1">{product.name}</h2>
            </div>
            <span className="text-2xl font-bold text-[#DC3545]" aria-label={`Precio: ${product.price}`}>{product.price}</span>
          </div>
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            aria-label={`Agregar ${product.name} al carrito por ${product.price}`}
            className="mt-6 w-full px-6 py-3 bg-[#DC3545] hover:bg-[#A02128] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            Agregar al carrito
          </button>
        </div>

        {/* Indicadores de posición */}
        <div className="absolute bottom-[180px] left-1/2 -translate-x-1/2 flex gap-2" role="tablist" aria-label="Navegación de imágenes">
          {Array.from({ length: totalItems }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              role="tab"
              aria-selected={currentIndex === index}
              aria-label={`Ir a imagen ${index + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart, onOpenModal }) {
  return (
    <article className="masonry-item group cursor-pointer" onClick={() => onOpenModal(product)} role="listitem" aria-label={`${product.name} - ${product.price}`}>
      <img
        src={product.image}
        alt={`${product.name} - ${product.category}`}
        className="masonry-image"
        loading="lazy"
      />
      <span className="masonry-badge" aria-label={`Categoría: ${product.category}`}>{product.category}</span>

      <div className="masonry-overlay">
        <span className="masonry-category">{product.category}</span>
        <h3 className="masonry-title">{product.name}</h3>
        <span className="masonry-price" aria-label={`Precio: ${product.price}`}>{product.price}</span>
        <div className="flex gap-2 mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(product);
            }}
            aria-label={`Ver detalles de ${product.name}`}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold rounded transition-colors flex items-center gap-2 backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            Ver
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            aria-label={`Agregar ${product.name} al carrito`}
            className="px-4 py-2 bg-[#DC3545] hover:bg-[#A02128] text-white text-sm font-semibold rounded transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Tienda() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showCursor, setShowCursor] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const gridRef = useRef(null);
  const hasAnimated = useRef(false);
  const { addToCart } = useCart();

  // Mostrar cursor después de montar
  useEffect(() => {
    setShowCursor(true);
  }, []);

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  const categories = ["Todos", "Wearables", "Audio"];

  const filteredProducts = selectedCategory === "Todos"
    ? products
    : products.filter(p => p.category === selectedCategory);

  // Animación inicial solo una vez
  useLayoutEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      gsap.fromTo(".category-filter",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out", delay: 0.3 }
      );
    });

    return () => ctx.revert();
  }, []);

  // Animación de productos cuando cambia el filtro
  useLayoutEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll(".masonry-item");

    const ctx = gsap.context(() => {
      gsap.fromTo(items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "all"
        }
      );
    });

    return () => ctx.revert();
  }, [filteredProducts]);

  return (
    <>
      <SEO
        title="Tienda - Productos Tecnológicos"
        description="Tienda de productos tecnológicos de Ingecotol Ltda. Smartwatches, audífonos, wearables y más. Calidad garantizada con envíos a toda Colombia."
        keywords="tienda tecnología, smartwatch, audífonos, wearables, Ingecotol, Colombia"
        canonical="https://ingecotol.com/tienda"
      />
      <div className="min-h-screen bg-white">
        {/* Header fijo con branding */}
        <header className="sticky top-0 z-50 bg-[#0A2342] text-white shadow-lg" role="banner">
          <div className="container mx-auto px-5 flex items-center justify-between">
            <Link to="/app" className="flex items-center gap-2 hover:opacity-80 transition-opacity" aria-label="Volver a la página principal">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
              <span className="font-family-oswald text-xl">Volver</span>
            </Link>
            <img
              src="/images/Logo ingecotol.png"
              alt="Ingecotol Ltda - Tienda de tecnología"
              className="h-14 md:h-35 w-auto object-contain"
            />
            <CartIcon />
          </div>
        </header>

        <main role="main">
          <h1 className="sr-only">Tienda de Productos Tecnológicos - Ingecotol Ltda</h1>

          {/* Filtros de categoría */}
          <nav className="bg-[#E8EEF2] py-6 sticky top-[56px] z-40 shadow-sm" aria-label="Filtros de categoría">
            <div className="container mx-auto px-5">
              <div className="flex flex-wrap gap-3 justify-center" role="group" aria-label="Categorías de productos">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={selectedCategory === category}
                    className={`category-filter px-6 py-2 font-semibold transition-all duration-300 border-2 ${
                      selectedCategory === category
                        ? 'bg-[#DC3545] text-white border-[#DC3545]'
                        : 'bg-white text-[#0A2342] border-[#CBD5E0] hover:border-[#4A90E2]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Grid de productos - Masonry Layout */}
          <section className="py-12 bg-white overflow-hidden" aria-labelledby="products-heading">
            <h2 id="products-heading" className="sr-only">
              {selectedCategory === "Todos" ? "Todos los productos" : `Productos de ${selectedCategory}`}
            </h2>
            <div className="container mx-auto">
              <div id="products-grid" ref={gridRef} className="masonry-grid" role="list" aria-label="Lista de productos">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onOpenModal={setSelectedProduct}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-20" role="status">
                  <p className="text-2xl text-[#4A5568] font-family-lato">
                    No hay productos en esta categoría
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#0A2342] text-white py-8 mt-12" role="contentinfo">
          <div className="container mx-auto px-5 text-center">
            <p className="text-sm">
              &copy; 2025 Ingecotol ltda. Todos los derechos reservados.
            </p>
            <p className="text-xs text-[#4A90E2] mt-2">
              Experiencia, calidad y variedad a su servicio
            </p>
          </div>
        </footer>
      </div>

      {/* Modal de producto con carrusel */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Carrito */}
      <Cart />
      <CartNotification />

      {showCursor && <BallCursor positionInitialCursor={{ left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 }} />}
    </>
  );
}
