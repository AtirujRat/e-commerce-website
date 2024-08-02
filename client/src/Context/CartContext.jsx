import React, { createContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const totalPrice = cart.reduce((acc, cur) => {
      return (acc += cur.price * cur.quantity);
    }, 0);
    const totalQuantity = cart.reduce((acc, cur) => {
      return (acc += cur.quantity);
    }, 0);

    setTotal(totalPrice);
    setQuantity(totalQuantity);
  }, [cart]);

  const addToCart = (newProd) => {
    const isProductExist = cart.map((item) => item.id);
    if (isProductExist.includes(newProd.id)) {
      const newCart = cart;
      const checkIndex = newCart.findIndex(
        (newCart) => newCart.id === newProd.id
      );
      newCart[checkIndex].quantity = newCart[checkIndex].quantity + 1;
      setCart(() => [...newCart]);
    } else {
      setCart((prev) => [...prev, newProd]);
    }
  };

  const removeFromCart = (id) => {
    const checkIndex = cart.findIndex((prod) => prod.id === id);
    if (cart[checkIndex].quantity === 1) {
      setCart(() => cart.filter((prod) => prod.id !== id));
    } else {
      const newCart = cart;
      newCart[checkIndex].quantity = newCart[checkIndex].quantity - 1;
      setCart(() => [...newCart]);
    }
  };

  const numberWithCommas = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        totalPrice: total,
        totalQuantity: quantity,
        addToCart,
        removeFromCart,
        numberWithCommas,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
