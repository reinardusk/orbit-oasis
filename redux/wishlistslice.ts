import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type WishlistEntity = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

const initialState: WishlistEntity[] = [];

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlist: (state, action: PayloadAction<WishlistEntity>) => {
      state.push(action.payload);
    },
    removeWishlist: (state, action: PayloadAction<{ name: string }>) => {
      const getIndex = state.findIndex(
        (item) => item.name === action.payload.name
      );
      state.splice(getIndex, 1);
    },
  },
});

export const { addWishlist, removeWishlist } = wishlistSlice.actions;
export const wishlistSelector = (state: RootState) => state.wishlistReducer;
export default wishlistSlice.reducer;
