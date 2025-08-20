import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { justUrl } from "../utils/url";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const SHIPPING_FEE = 5000;

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (item) => {
    await justUrl.patch(`/products/carted/${item._id}`);

    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      const sanitizedItem = {
        ...item,
        price: Number(item.price),
        quantity: Number(item.quantity),
        selectedColor: item.selectedColor || item.colors?.[0] || "",
      };

      if (existing) {
        return prev.map((i) =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + sanitizedItem.quantity }
            : i
        );
      } else {
        return [...prev, sanitizedItem];
      }
    });
  };

  const updateColor = (id, color) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, selectedColor: color } : item
      )
    );
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.length;

  const totalItemsPrice = cartItems.reduce((acc, item) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity);
    return acc + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
  }, 0);

  const totalPrice = totalItemsPrice + SHIPPING_FEE;

  const formatPrice = (amount) => {
    return amount.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
    });
  };

  console.log(cartItems);
  console.log(
    "Cart Price Debug:",
    cartItems.map((i) => ({ price: i.price, quantity: i.quantity }))
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        cartCount,
        clearCart,
        totalPrice,
        totalItemsPrice,
        SHIPPING_FEE,
        updateColor,
        formatPrice,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
