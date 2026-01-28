import { useRef, useLayoutEffect, useCallback, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import gsap from 'gsap';

export default function Cart() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getItemCount,
    checkoutWhatsApp
  } = useCart();

  const overlayRef = useRef(null);
  const sidebarRef = useRef(null);
  const itemsRef = useRef([]);

  // Limpiar referencias cuando cambian los items
  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, cart.items.length);
  }, [cart.items.length]);

  // Animación de entrada
  useLayoutEffect(() => {
    if (!isCartOpen || !overlayRef.current || !sidebarRef.current) return;

    // Filtrar referencias válidas
    const validItems = itemsRef.current.filter(el => el !== null && el !== undefined);

    const ctx = gsap.context(() => {
      // Timeline de entrada
      const tl = gsap.timeline();

      // Fade in del overlay
      tl.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Slide in del sidebar desde la derecha
      tl.fromTo(sidebarRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.4, ease: "power3.out" },
        "-=0.2"
      );

      // Animar items del carrito uno por uno
      if (validItems.length > 0) {
        tl.fromTo(validItems,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.08,
            ease: "power2.out"
          },
          "-=0.2"
        );
      }
    });

    return () => ctx.revert();
  }, [isCartOpen]);

  // Animación de cierre
  const handleClose = useCallback(() => {
    if (!sidebarRef.current || !overlayRef.current) {
      setIsCartOpen(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setIsCartOpen(false)
    });

    // Slide out del sidebar
    tl.to(sidebarRef.current, {
      x: "100%",
      duration: 0.3,
      ease: "power3.in"
    });

    // Fade out del overlay
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    }, "-=0.15");
  }, [setIsCartOpen]);

  // Animación al eliminar item
  const handleRemoveItem = useCallback((itemId, index) => {
    const itemEl = itemsRef.current[index];
    if (itemEl && document.body.contains(itemEl)) {
      gsap.to(itemEl, {
        x: 100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          removeFromCart(itemId);
        }
      });
    } else {
      removeFromCart(itemId);
    }
  }, [removeFromCart]);

  // Manejar decremento de cantidad (con animación si llega a 0)
  const handleDecrement = useCallback((item, index) => {
    const itemKey = item.cartId || item.id;
    if (item.quantity <= 1) {
      handleRemoveItem(itemKey, index);
    } else {
      updateQuantity(itemKey, item.quantity - 1);
    }
  }, [handleRemoveItem, updateQuantity]);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Cart Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A2342] z-[101] shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 id="cart-title" className="font-family-oswald text-xl text-white">
            Carrito ({getItemCount()})
          </h2>
          <button
            onClick={handleClose}
            className="text-white/60 hover:text-white p-2 transition-colors"
            aria-label="Cerrar carrito"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/60">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
                <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item, index) => {
                const itemKey = item.cartId || item.id;
                const itemName = item.displayName || item.name;
                return (
                  <div
                    key={itemKey}
                    ref={el => itemsRef.current[index] = el}
                    className="flex gap-3 bg-white/5 rounded-lg p-3 transition-colors hover:bg-white/10"
                  >
                    <img
                      src={item.image}
                      alt={itemName}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-sm font-medium truncate">{itemName}</h3>
                      <p className="text-[#4A90E2] text-sm">{item.price}</p>
                      <p className="text-white/40 text-xs">{item.category}</p>

                      {/* Controles de cantidad */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDecrement(item, index);
                          }}
                          className="w-6 h-6 flex items-center justify-center bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                          aria-label="Reducir cantidad"
                        >
                          -
                        </button>
                        <span className="text-white text-sm w-6 text-center" aria-label={`Cantidad: ${item.quantity}`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(itemKey, item.quantity + 1);
                          }}
                          className="w-6 h-6 flex items-center justify-center bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(itemKey, index);
                      }}
                      className="text-white/40 hover:text-[#DC3545] p-1 transition-colors"
                      aria-label={`Eliminar ${itemName} del carrito`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t border-white/10 p-4 space-y-4">
            {/* Resumen */}
            <div className="space-y-2">
              <div className="flex justify-between text-white/60 text-sm">
                <span>Subtotal</span>
                <span>${cart.total.toLocaleString('es-CO')}</span>
              </div>
              <div className="flex justify-between text-white/60 text-sm">
                <span>Envío</span>
                <span>Por confirmar</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10">
                <span>Total</span>
                <span className="text-[#4A90E2]">${cart.total.toLocaleString('es-CO')}</span>
              </div>
            </div>

            {/* Botón de WhatsApp */}
            <button
              onClick={() => checkoutWhatsApp()}
              className="w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Pedir por WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
