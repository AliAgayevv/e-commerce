import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [id, setId] =  useState(0);
  const [category, setCategory] = useState("All");
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setCart(userData.cart || []);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const syncCartToFirestore = async (updatedCart) => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { cart: updatedCart });
    }
  };

  const setProductId = (product) => {
    setId(product.id)

  }

  const addToCart = async (product) => {
    const updatedCart = cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 }; 
      }
      return item;
    });

    if (!cart.some((item) => item.id === product.id)) {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    await syncCartToFirestore(updatedCart); 
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    await syncCartToFirestore(updatedCart); 
  };

  const updateCartQuantity = async (productId, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );

    setCart(updatedCart);
    await syncCartToFirestore(updatedCart); 
  };

  return (
    <CartContext.Provider
      value={{ cart, id ,addToCart, setAllProducts, allProducts ,removeFromCart, updateCartQuantity, setCategory, category, setProductId }}
    >
      {children}
    </CartContext.Provider>
  );
};