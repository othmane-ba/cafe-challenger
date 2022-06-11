import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../reducers/cart.reducer";
import categorieReducer from"../reducers/categorie.reducer";
import carouselReducer from"../reducers/carousel.reducer";
import menuReducer from"../reducers/menu.reducer";
import reviewsReducer from"../reducers/reviews.reducer";
import cartItemsReducer from"../reducers/cartItems.reducer";
import clientReducer from"../reducers/client.reducer";
import orderReducer from "../reducers/order.reducer";

const rootReducer = combineReducers({
  slides: carouselReducer,
  categories:categorieReducer,
  menu: menuReducer,
  reviews: reviewsReducer,
  cart: cartReducer,
  cartitems: cartItemsReducer,
  client: clientReducer,
  order: orderReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  // devTools:false
})