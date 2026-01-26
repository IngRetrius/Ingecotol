import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Cargar carrito desde localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('ingecotol-cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (parsed.items && Array.isArray(parsed.items)) {
          setCart(parsed);
        }
      }
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    }
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ingecotol-cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
    }
  }, [cart]);

  // Calcular total
  const calculateTotal = (items) => {
    return items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[$.]/g, '').replace(',', '.'));
      return sum + (price * item.quantity);
    }, 0);
  };

  // Añadir producto al carrito
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingIndex = prevCart.items.findIndex(item => item.id === product.id);

      let newItems;
      if (existingIndex > -1) {
        newItems = prevCart.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevCart.items, { ...product, quantity: 1 }];
      }

      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
    });

    showNotification(`${product.name} añadido al carrito`, 'success');
    setIsCartOpen(true);
  };

  // Eliminar producto del carrito
  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.id !== itemId);
      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
    });
  };

  // Actualizar cantidad
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
    });
  };

  // Limpiar carrito
  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  // Obtener cantidad total de items
  const getItemCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  // Mostrar notificación
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Generar mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    if (cart.items.length === 0) return '';

    let message = '¡Hola! Me interesa realizar el siguiente pedido:\n\n';

    cart.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio: ${item.price}\n\n`;
    });

    message += `*Total estimado: $${cart.total.toLocaleString('es-CO')}*\n\n`;
    message += '¿Podrían confirmarme disponibilidad y forma de pago?';

    return encodeURIComponent(message);
  };

  // Checkout por WhatsApp
  const checkoutWhatsApp = (phoneNumber = '573106564709') => {
    const message = generateWhatsAppMessage();
    if (message) {
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemCount,
      notification,
      checkoutWhatsApp
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}
