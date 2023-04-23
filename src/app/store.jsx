import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import blogReducer from "../features/blogSlice";
import themeReducer from "../features/themeSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

//! configureStore metodu hem bir store olusturur hem de olsuturken farkli reducer'lari birlesitir.

const persistAuthConfig = {
  key: "auth",
  storage,
};
const persistThemeConfig = {
  key: "theme",
  storage,
};

const persistedauthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedthemeReducer = persistReducer(persistThemeConfig, themeReducer);
const store = configureStore({
  reducer: {
    auth: persistedauthReducer,
    blog: blogReducer,
    theme: persistedthemeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  //! Dev tool'u kapatmak icin kullanılan degisken
});

export const persistor = persistStore(store);

export default store;
