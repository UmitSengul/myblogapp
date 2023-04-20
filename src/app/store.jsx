import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import blogReducer from "../features/blogSlice"
import themeReducer from "../features/themeSlice"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

//! configureStore metodu hem bir store olusturur hem de olsuturken farkli reducer'lari birlesitir.


const persistConfig = {
  key: 'auth',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    blog: blogReducer,
    theme: themeReducer,
  
  },
  devTools: process.env.NODE_ENV !== "production",
  //! Dev tool'u kapatmak icin kullanılan degisken
})

export const persistor=persistStore(store)

export default store