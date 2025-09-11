// src/redux/selectors/cart.js
import { createSelector } from "@reduxjs/toolkit";
import { derivePricing } from "@/shared/utils/product";

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + (item.quantity || 0), 0)
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => {
    const { effectivePrice } = derivePricing(item);
    const lineTotal = (Number(effectivePrice) || 0) * (item.quantity || 0);
    return sum + lineTotal;
  }, 0)
);
