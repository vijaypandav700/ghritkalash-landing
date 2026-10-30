"use client";

import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";

// ── Cart Reducer ──────────────────────────────────────────────────────────────

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.find((i) => i.variantId === action.payload.variantId);
      if (exists) {
        return state.map((i) =>
          i.variantId === action.payload.variantId
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...state, { ...action.payload, qty: 1 }];
    }

    case "UPDATE_QTY":
      return state
        .map((i) =>
          i.variantId === action.variantId
            ? { ...i, qty: i.qty + action.delta }
            : i
        )
        .filter((i) => i.qty > 0);

    case "REMOVE_ITEM":
      return state.filter((i) => i.variantId !== action.variantId);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

const CartContext = createContext(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }

  // ── Toast ─────────────────────────────────────────────────────────────────

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3800);
  }, []);

  // ── Cart Actions ──────────────────────────────────────────────────────────

  const addItem = useCallback(
    (product, variant) => {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          productId: product.id,
          variantId: variant.id,
          name: product.name,
          variantLabel: variant.label,
          unit: variant.unit,
          image: product.image,
          price: variant.price,
          mrp: variant.mrp,
        },
      });
      showToast(`Added to cart!`);
    },
    [showToast]
  );

  const updateQty = useCallback((variantId, delta) => {
    dispatch({ type: "UPDATE_QTY", variantId, delta });
  }, []);

  const removeItem = useCallback((variantId) => {
    dispatch({ type: "REMOVE_ITEM", variantId });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  // ── Derived ───────────────────────────────────────────────────────────────

  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        updateQty,
        removeItem,
        clearCart,
        totalQty,
        subtotal,
        toast,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
