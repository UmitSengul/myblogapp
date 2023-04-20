import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./router/AppRouter";
import { createTheme, ThemeProvider } from "@mui/material/styles"
import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";

function App() {

  const [prefersDarkMode, setPrefersDarkMode] = useState(true)

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  )

  return (
    <div className="App">
    <ThemeProvider theme={theme}>
        <Provider store={store}>
        <CssBaseline />
        <Navbar
          setPrefersDarkMode={setPrefersDarkMode}
          prefersDarkMode={prefersDarkMode}
        />
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
          </PersistGate>
        </Provider>
      <ToastContainer/>
      </ThemeProvider>
    </div>
  );
}

export default App;