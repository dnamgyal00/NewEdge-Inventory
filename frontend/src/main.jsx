import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./routes.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  client_secret: "78Lv7hU3cZOzAPM3F840caSKI9m5HcZa",
  client_id: "inventory",
  redirect_uri: "http://localhost:5173",
  authority: "http://192.168.131.160:8080/realms/neterp",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <AuthProvider {...oidcConfig}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </AuthProvider>

  
  </React.StrictMode>
);
