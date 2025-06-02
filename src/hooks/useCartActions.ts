import { useCart } from '@/context/CartContext';
import type { CartItem } from '@/context/CartContext';

export function useCartActions() {
  const { state, addItem, removeItem, updateQuantity, clearCart } = useCart();

  const addItemToCart = (item: CartItem) => {
    addItem(item);
  };

  const removeItemFromCart = (id: number) => {
    removeItem(id);
  };

  const updateItemQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeItemFromCart(id);
      return;
    }
    updateQuantity(id, quantity);
  };

  const getItemQuantity = (id: number) => {
    const item = state.items.find(item => item.id === id);
    return item?.quantity || 0;
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getFormattedTotal = () => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(state.total);
  };

  return {
    items: state.items,
    total: state.total,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    getItemQuantity,
    getTotalItems,
    getFormattedTotal,
    clearCart
  };
} 