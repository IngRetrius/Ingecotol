import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import BallCursor from "../components/common/BallCursor";
import { useCart } from "../context/CartContext";
import Cart from "../components/cart/Cart";
import CartIcon from "../components/cart/CartIcon";
import CartNotification from "../components/cart/CartNotification";

// Datos de productos de tecnología
const products = [
  {
    id: 1,
    name: "Router Wi-Fi 6 Mesh",
    category: "Redes",
    price: "$299.990",
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Switch Gigabit 24 Puertos",
    category: "Redes",
    price: "$189.990",
    image: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=600&h=800&fit=crop",
  },
  {
    id: 3,
    name: "Cámara IP 4K PTZ",
    category: "Seguridad",
    price: "$459.990",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&h=900&fit=crop",
  },
  {
    id: 4,
    name: "Access Point Enterprise",
    category: "Redes",
    price: "$349.990",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=450&fit=crop",
  },
  {
    id: 5,
    name: "Cable UTP Cat 6A - 305m",
    category: "Cableado",
    price: "$129.990",
    image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=600&h=350&fit=crop",
  },
  {
    id: 6,
    name: "Rack 19\" 42U",
    category: "Infraestructura",
    price: "$899.990",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=750&fit=crop",
  },
  {
    id: 7,
    name: "UPS Online 3kVA",
    category: "Energía",
    price: "$1.299.990",
    image: "https://images.unsplash.com/photo-1591489378430-7a5cba5f4167?w=600&h=500&fit=crop",
  },
  {
    id: 8,
    name: "Patch Panel 48 Puertos",
    category: "Cableado",
    price: "$79.990",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
  },
  {
    id: 9,
    name: "Firewall Next-Gen",
    category: "Seguridad",
    price: "$2.499.990",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=850&fit=crop",
  },
  {
    id: 10,
    name: "Fibra Óptica Monomodo",
    category: "Cableado",
    price: "$199.990",
    image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=600&h=380&fit=crop",
  },
  {
    id: 11,
    name: "Antena Direccional 5GHz",
    category: "Redes",
    price: "$149.990",
    image: "https://images.unsplash.com/photo-1516044734145-07ca8eef8731?w=600&h=700&fit=crop",
  },
  {
    id: 12,
    name: "Kit Herramientas Networking",
    category: "Herramientas",
    price: "$89.990",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&h=600&fit=crop",
  },
  {
    id: 13,
    name: "Servidor NAS 4 Bahías",
    category: "Almacenamiento",
    price: "$549.990",
    image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&h=800&fit=crop",
  },
  {
    id: 14,
    name: "PoE Injector Gigabit",
    category: "Redes",
    price: "$39.990",
    image: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=600&h=400&fit=crop",
  },
  {
    id: 15,
    name: "KVM Switch 8 Puertos",
    category: "Infraestructura",
    price: "$279.990",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=450&fit=crop",
  },
  {
    id: 16,
    name: "Cámara Domo Exterior",
    category: "Seguridad",
    price: "$189.990",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=500&fit=crop",
  },
  {
    id: 17,
    name: "Switch PoE 8 Puertos",
    category: "Redes",
    price: "$129.990",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=350&fit=crop",
  },
  {
    id: 18,
    name: "Multímetro Digital Pro",
    category: "Herramientas",
    price: "$79.990",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop",
  },
  {
    id: 19,
    name: "Disco SSD 1TB Enterprise",
    category: "Almacenamiento",
    price: "$249.990",
    image: "https://images.unsplash.com/photo-1597138804456-e7dca7f59d54?w=600&h=400&fit=crop",
  },
  {
    id: 20,
    name: "Cable HDMI 4K 15m",
    category: "Cableado",
    price: "$49.990",
    image: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=600&h=300&fit=crop",
  },
  {
    id: 21,
    name: "Regulador de Voltaje 2kVA",
    category: "Energía",
    price: "$189.990",
    image: "https://images.unsplash.com/photo-1609752441539-25e51f84f88d?w=600&h=650&fit=crop",
  },
  {
    id: 22,
    name: "Panel Solar 400W",
    category: "Energía",
    price: "$599.990",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=450&fit=crop",
  },
  {
    id: 23,
    name: "Gabinete de Pared 9U",
    category: "Infraestructura",
    price: "$299.990",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=800&fit=crop",
  },
  {
    id: 24,
    name: "Transceiver SFP+ 10G",
    category: "Redes",
    price: "$89.990",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=380&fit=crop",
  },
  {
    id: 25,
    name: "DVR 16 Canales 4K",
    category: "Seguridad",
    price: "$649.990",
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&h=420&fit=crop",
  },
  {
    id: 26,
    name: "Fusionadora de Fibra",
    category: "Herramientas",
    price: "$4.999.990",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=700&fit=crop",
  },
  {
    id: 27,
    name: "Disco Duro 8TB NAS",
    category: "Almacenamiento",
    price: "$349.990",
    image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600&h=500&fit=crop",
  },
  {
    id: 28,
    name: "Router Mikrotik CCR",
    category: "Redes",
    price: "$1.899.990",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=350&fit=crop",
  },
  {
    id: 29,
    name: "Batería UPS 12V 9Ah",
    category: "Energía",
    price: "$59.990",
    image: "https://images.unsplash.com/photo-1619641805634-98e5c833a51f?w=600&h=400&fit=crop",
  },
  {
    id: 30,
    name: "Cámara Bullet 8MP",
    category: "Seguridad",
    price: "$299.990",
    image: "https://images.unsplash.com/photo-1555086156-e6c7353d283f?w=600&h=550&fit=crop",
  },
];

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="masonry-item group">
      <img
        src={product.image}
        alt={product.name}
        className="masonry-image"
        loading="lazy"
      />
      <span className="masonry-badge">{product.category}</span>
      <div className="masonry-overlay">
        <span className="masonry-category">{product.category}</span>
        <h3 className="masonry-title">{product.name}</h3>
        <span className="masonry-price">{product.price}</span>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-3 px-4 py-2 bg-[#DC3545] hover:bg-[#A02128] text-white text-sm font-semibold rounded transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
          Agregar
        </button>
      </div>
    </div>
  );
}

export default function Tienda() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showCursor, setShowCursor] = useState(false);
  const gridRef = useRef(null);
  const hasAnimated = useRef(false);
  const { addToCart } = useCart();

  // Mostrar cursor después de montar
  useEffect(() => {
    setShowCursor(true);
  }, []);

  const categories = ["Todos", "Redes", "Seguridad", "Cableado", "Infraestructura", "Energía", "Almacenamiento", "Herramientas"];

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
      <div className="min-h-screen bg-white">
        {/* Header fijo con branding */}
        <header className="sticky top-0 z-50 bg-[#0A2342] text-white shadow-lg">
          <div className="container mx-auto px-5 py-2 flex items-center justify-between">
            <Link to="/app" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
              <span className="font-family-oswald text-xl">Volver</span>
            </Link>
            <img
              src="/images/Logo ingecotol.png"
              alt="Ingecotol"
              className="h-10 md:h-12 w-auto object-contain"
            />
            <CartIcon />
          </div>
        </header>

        {/* Filtros de categoría */}
        <section className="bg-[#E8EEF2] py-6 sticky top-[56px] z-40 shadow-sm">
          <div className="container mx-auto px-5">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
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
        </section>

        {/* Grid de productos - Masonry Layout */}
        <section className="py-12 bg-white overflow-hidden">
          <div className="container mx-auto">
            <div id="products-grid" ref={gridRef} className="masonry-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl text-[#4A5568] font-family-lato">
                  No hay productos en esta categoría
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0A2342] text-white py-8 mt-12">
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

      {/* Carrito */}
      <Cart />
      <CartNotification />

      {showCursor && <BallCursor positionInitialCursor={{ left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 }} />}
    </>
  );
}
