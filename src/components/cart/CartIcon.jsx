import { useRef, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import gsap from 'gsap';

export default function CartIcon() {
  const { setIsCartOpen, getItemCount } = useCart();
  const itemCount = getItemCount();
  const buttonRef = useRef(null);
  const iconRef = useRef(null);
  const badgeRef = useRef(null);
  const prevCountRef = useRef(itemCount);

  // Animación cuando cambia la cantidad de items
  useEffect(() => {
    if (itemCount !== prevCountRef.current && badgeRef.current && itemCount > 0) {
      // Animación de pulse en el badge
      gsap.fromTo(badgeRef.current,
        { scale: 1.5 },
        {
          scale: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.4)"
        }
      );

      // Pequeño shake del icono
      gsap.fromTo(iconRef.current,
        { rotate: -10 },
        {
          rotate: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        }
      );
    }
    prevCountRef.current = itemCount;
  }, [itemCount]);

  const handleClick = () => {
    // Animación del icono
    const tl = gsap.timeline();

    tl.to(iconRef.current, {
      scale: 0.8,
      duration: 0.1,
      ease: "power2.in"
    })
    .to(iconRef.current, {
      scale: 1.2,
      duration: 0.15,
      ease: "power2.out"
    })
    .to(iconRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "elastic.out(1, 0.5)"
    });

    // Animación del badge si existe
    if (badgeRef.current && itemCount > 0) {
      gsap.to(badgeRef.current, {
        scale: 1.3,
        duration: 0.15,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    }

    // Abrir el carrito después de la animación inicial
    setTimeout(() => setIsCartOpen(true), 150);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
      aria-label={`Abrir carrito${itemCount > 0 ? `, ${itemCount} productos` : ''}`}
    >
      <svg
        ref={iconRef}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
      </svg>
      {itemCount > 0 && (
        <span
          ref={badgeRef}
          className="absolute -top-1 -right-1 bg-[#DC3545] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
}
