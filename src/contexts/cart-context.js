import React, { createContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return {
      items: [],
      totalAmount: 0,
      isCartOpen: false,
    };
  }
  if (action.type === "ADD_ITEM") {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "DECREASE_ITEM") {
    const itemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[itemIndex];

    const updatedItem = {
      ...existingItem,
      amount: existingItem.amount - 1,
      totalPrice: existingItem.totalPrice - existingItem.price,
    };

    const updatedItems = [...state.items];
    updatedItems[itemIndex] = updatedItem;

    if (updatedItem.amount === 0) {
      updatedItems.splice(itemIndex, 1);
    }

    return {
      ...state,
      items: updatedItems,
      totalAmount: state.totalAmount - existingItem.price,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const itemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[itemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[itemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return state;
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });

  const addItemToCart = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };
  const decreaseItemAmount = (id) => {
    dispatchCartAction({ type: "DECREASE_ITEM", id: id });
  };
  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };
  const saveOrder = () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      date: new Date().toISOString(),
    };

    storedOrders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(storedOrders));

    dispatchCartAction({ type: "CLEAR_CART" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    decreaseItemAmount: decreaseItemAmount,
    saveOrder: saveOrder,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
