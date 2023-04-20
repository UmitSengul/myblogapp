import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="App">

        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
          </PersistGate>
        </Provider>
      <ToastContainer/>
    </div>
  );
}

export default App;