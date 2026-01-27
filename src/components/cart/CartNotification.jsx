import { useRef, useLayoutEffect } from 'react';
import { useCart } from '../../context/CartContext';
import gsap from 'gsap';

export default function CartNotification() {
  const { notification } = useCart();
  const notificationRef = useRef(null);

  useLayoutEffect(() => {
    if (!notification || !notificationRef.current) return;

    const el = notificationRef.current;

    // Animación de entrada desde la izquierda
    gsap.fromTo(el,
      {
        x: -50,
        opacity: 0,
        scale: 0.9
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      }
    );

    // Pequeño bounce al icono del carrito
    gsap.fromTo(el.querySelector('.cart-icon'),
      { rotate: -15 },
      {
        rotate: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
        delay: 0.2
      }
    );

  }, [notification]);

  if (!notification) return null;

  const bgColor = notification.type === 'success'
    ? 'bg-[#2f5597]'
    : notification.type === 'error'
      ? 'bg-[#DC3545]'
      : 'bg-[#0A2342]';

  const icon = notification.type === 'success' ? (
    <svg className="cart-icon w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
  ) : notification.type === 'error' ? (
    <svg className="cart-icon w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
    </svg>
  ) : (
    <svg className="cart-icon w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
    </svg>
  );

  return (
    <div
      ref={notificationRef}
      className={`fixed bottom-5 left-5 ${bgColor} text-white px-5 py-3 rounded-lg shadow-2xl z-[200] flex items-center gap-3`}
      role="alert"
      aria-live="polite"
    >
      {icon}
      <span className="font-medium">{notification.message}</span>
    </div>
  );
}
