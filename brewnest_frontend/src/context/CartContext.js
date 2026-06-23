import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

import { cartApi } from '../api/cartApi';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    try {
      setLoading(true);

      const data = await cartApi.getCart();

      setCart(data);
    } catch (error) {
      console.log(
        'Load Cart Error:',
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = async (item, quantity = 1) => {
    try {
      await cartApi.addToCart(
        item.id,
        quantity
      );

      await loadCart();
    } catch (error) {
      console.log(
        'Add To Cart Error:',
        error.response?.data || error.message
      );
    }
  };

  const increaseQuantity = async (
    cartItemId,
    currentQuantity
  ) => {
    try {
      await cartApi.updateQuantity(
        cartItemId,
        currentQuantity + 1
      );

      await loadCart();
    } catch (error) {
      console.log(
        'Increase Quantity Error:',
        error.response?.data || error.message
      );
    }
  };

  const decreaseQuantity = async (
    cartItemId,
    currentQuantity
  ) => {
    try {
      const newQuantity = currentQuantity - 1;

      if (newQuantity <= 0) {
        await cartApi.removeItem(cartItemId);
      } else {
        await cartApi.updateQuantity(
          cartItemId,
          newQuantity
        );
      }

      await loadCart();
    } catch (error) {
      console.log(
        'Decrease Quantity Error:',
        error.response?.data || error.message
      );
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await cartApi.removeItem(cartItemId);

      await loadCart();
    } catch (error) {
      console.log(
        'Remove Cart Item Error:',
        error.response?.data || error.message
      );
    }
  };

  const clearCart = async () => {
    try {
      await cartApi.clearCart();

      await loadCart();
    } catch (error) {
      console.log(
        'Clear Cart Error:',
        error.response?.data || error.message
      );
    }
  };

  const cartItems = useMemo(() => {
    return cart?.items || [];
  }, [cart]);

  const totalAmount = useMemo(() => {
    return cart?.totalAmount || 0;
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart?.totalItems || 0;
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        totalAmount,
        totalItems,
        loading,

        loadCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};