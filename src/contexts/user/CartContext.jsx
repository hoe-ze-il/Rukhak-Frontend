import { createContext, useReducer, useContext, useEffect } from "react";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
const buyNowFromLocalStorage = JSON.parse(
  localStorage.getItem("buyNow") || "[]"
);

// Initial state for the cart
const initialState = {
  cartItems: cartFromLocalStorage,
  buyNowItems: buyNowFromLocalStorage,
  totalQuantityCart: 0,
  totalQuantityBuynow: 0,
};

// Action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";
const UPDATE_TOTAL_QUANTITY_CART = "UPDATE_TOTAL_QUANTITY_CART";
const UPDATE_TOTAL_QUANTITY_BUYNOW = "UPDATE_TOTAL_QUANTITY_BUYNOW";
const ADD_TO_BUY_NOW = "ADD_TO_BUY_NOW";
const CLEAR_BUY_NOW_ITEMS = "CLEAR_BUY_NOW_ITEMS";

// Reducer function to manage cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      // Check if the productId is already in the cart
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    }

    case ADD_TO_BUY_NOW: {
      const existingItem = state.buyNowItems.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        return {
          ...state,
          buyNowItems: state.buyNowItems.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          buyNowItems: [...state.buyNowItems, action.payload],
        };
      }
    }

    case CLEAR_BUY_NOW_ITEMS: {
      return {
        ...state,
        buyNowItems: [],
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== action.payload.productId
        ),
      };

    case INCREMENT_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case DECREMENT_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productId === action.payload.productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case UPDATE_TOTAL_QUANTITY_CART:
      return {
        ...state,
        totalQuantityCart: action.payload.totalQuantityCart,
      };

    case UPDATE_TOTAL_QUANTITY_BUYNOW:
      return {
        ...state,
        totalQuantityBuynow: action.payload.totalQuantityBuynow,
      };

    default:
      return state;
  }
};

// Create context and export it
export const CartContext = createContext();

// CartProvider component to wrap your app with
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const totalQuantityCart = state.cartItems.reduce(
      (total, productId) => total + productId.quantity,
      0
    );

    console.log(totalQuantityCart);
    dispatch({
      type: "UPDATE_TOTAL_QUANTITY_CART",
      payload: { totalQuantityCart },
    });
  }, [state.cartItems]);

  useEffect(() => {
    const totalQuantityBuynow = state.buyNowItems.reduce(
      (total, productId) => total + productId.quantity,
      0
    );

    console.log("total qty of buynow:", totalQuantityBuynow);
    dispatch({
      type: "UPDATE_TOTAL_QUANTITY_BUYNOW",
      payload: { totalQuantityBuynow },
    });
  }, [state.buyNowItems]);

  const addToBuyNow = (productId) => {
    dispatch({ type: ADD_TO_BUY_NOW, payload: productId });
  };

  return (
    <CartContext.Provider
      value={{
        totalQuantityCart: state.totalQuantityCart,
        totalQuantityBuynow: state.totalQuantityBuynow,
        cartItems: state.cartItems,
        buyNowItems: state.buyNowItems,
        addToBuyNow,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart state and dispatch function
const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};

export { CartProvider, useCart };
