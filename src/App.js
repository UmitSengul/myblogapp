import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./router/AppRouter";
import { createTheme, ThemeProvider } from "@mui/material/styles"
import React, { useState } from "react";
import { CssBaseline } from "@mui/material";

function App() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false)

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

    <ThemeProvider theme={theme}>
        <Provider store={store}>
        <CssBaseline />

        <PersistGate loading={null} persistor={persistor}>
          <AppRouter            setPrefersDarkMode={setPrefersDarkMode}
          prefersDarkMode={prefersDarkMode} />
          </PersistGate>
        </Provider>
      <ToastContainer/>
      </ThemeProvider>

  );
}

export default App;