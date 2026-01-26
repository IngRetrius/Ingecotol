import { useCart } from '../../context/CartContext';

export default function CartNotification() {
  const { notification } = useCart();

  if (!notification) return null;

  const bgColor = notification.type === 'success'
    ? 'bg-[#2f5597]'
    : notification.type === 'error'
      ? 'bg-[#DC3545]'
      : 'bg-[#0A2342]';

  return (
    <div className={`fixed bottom-5 right-5 ${bgColor} text-white px-5 py-3 rounded-lg shadow-lg z-[200] animate-slide-up`}>
      {notification.message}
    </div>
  );
}
