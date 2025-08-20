import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { CartProvider } from "./context/CartProvider.jsx";
import { ProductProvider } from "./context/ProductProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ProductProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <App />
            </Router>
          </CartProvider>
        </AuthProvider>
      </ProductProvider>
    </Provider>
  </StrictMode>
);
