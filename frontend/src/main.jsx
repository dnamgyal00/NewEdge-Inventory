import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./routes.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  client_secret: "nS9eMyXhMR2G8wQYVRqYSf80vNMq8EmW",
  client_id: "inventory",
  redirect_uri: "http://localhost:5173",
  authority: "https://lemur-1.cloud-iam.com/auth/realms/newedge-erp/",
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
