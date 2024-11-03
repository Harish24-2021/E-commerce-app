import { configureStore } from '@reduxjs/toolkit'
import porductsReducer from  './productsSlice'


export const store = configureStore({
  reducer: {
    products: porductsReducer
  },
})