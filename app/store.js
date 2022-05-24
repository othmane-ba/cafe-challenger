import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import categorieReducer from"../reducers/categorie.reducer";
import carouselReducer from"../reducers/carousel.reducer";
import menuReducer from"../reducers/menu.reducer";
import reviewsReducer from"../reducers/reviews.reducer";

const rootReducer = combineReducers({
  slides: carouselReducer,
  categories:categorieReducer,
  menu: menuReducer,
  reviews: reviewsReducer,
  cart: cartSlice,
})

export const store = configureStore({
  reducer: rootReducer
})