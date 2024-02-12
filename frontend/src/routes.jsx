import React from 'react'
import App from "./App.jsx";
import "./assets/styles/bootstrap.custom.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import AddCategoryScreen from "./screens/AddCategoryScreen.jsx";
import ItemScreen from "./screens/ItemScreen.jsx";
import AddItemScreen from "./screens/AddItemScreen.jsx";
import CategoryScreen from "./screens/CategoryScreen.jsx";
import TransactionScreen from "./screens/TransactionScreen.jsx";
import StockInScreen from "./screens/StockInScreen.jsx";
import StockOutScreen from "./screens/StockOutScreen.jsx";
import InventoryReport from "./screens/InventoryReport.jsx";
import YearlyReport from "./screens/YearlyReport.jsx";
import MonthlyReport from './screens/MonthlyReport.jsx';
import ItemDetailsScreen from "./screens/ItemDetailsScreen.jsx";
import CategoryDetailsScreen from "./screens/CategoryDetailsScreen.jsx";
import Error from "./Error404.jsx";
import CategoryAddItemScreen from "./screens/CategoryAddItemScreen.jsx";
import ItemStockInScreen from "./screens/ItemStockInScreen.jsx";
import ItemStockOutScreen from "./screens/ItemStockOutScreen.jsx";
import ItemEditScreen from "./screens/ItemEditScreen.jsx";
import CategoryEditScreen from "./screens/CategoryEditScreen.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route index={true} path="/home" element={<HomeScreen />} />
        <Route index={true} path="/home/profile" element={<ProfileScreen />} />

        {/* Item routes */}
        <Route index={true} path="/home/item" element={<ItemScreen />} />
        <Route
          index={true}
          path="/home/item/:name"
          element={<ItemDetailsScreen />}
        />
        <Route
          index={true}
          path="/home/item/add-item"
          element={<AddItemScreen />}
        />
        <Route
          index={true}
          path="/home/item/:name/stock-in"
          element={<ItemStockInScreen />}
        />
        <Route
          index={true}
          path="/home/item/:name/stock-out"
          element={<ItemStockOutScreen />}
        />

        <Route
          index={true}
          path="/home/item/:name/edit"
          element={<ItemEditScreen />}
        />

        {/* category routes */}
        <Route
          index={true}
          path="/home/category"
          element={<CategoryScreen />}
        />
        <Route
          index={true}
          path="/home/category/add-category"
          element={<AddCategoryScreen />}
        />
        <Route
          index={true}
          path="/home/category/:name"
          element={<CategoryDetailsScreen />}
        />
        <Route
          index={true}
          path="/home/category/:name/add-item"
          element={<CategoryAddItemScreen />}
        />
        <Route
          index={true}
          path="/home/category/:name/edit"
          element={<CategoryEditScreen />}
        />

        <Route
          index={true}
          path="/transactions-history"
          element={<TransactionScreen />}
        />
        <Route index={true} path="/stock-in" element={<StockInScreen />} />
        <Route index={true} path="/stock-out" element={<StockOutScreen />} />
        <Route
          index={true}
          path="/inventory-report"
          element={<InventoryReport />}
        />
        <Route
          index={true}
          path="/yearly-report"
          element={<YearlyReport />}
        />
        <Route
        index={true}
        path="/monthly-report"
        element={<MonthlyReport />}
        />
        {/* Admin users */}
        {/* <Route
          index={true}
          path="/admin/add-item"
          element={<AddItemScreen />}
        /> */}
      </Route>

      {/* Error route */}
      <Route path="error" element={<Error />} />
      {/* Page Not Found route */}
      <Route path="*" element={<Navigate to="/error" />} />
    </>
  )
);

export const AppRoutes = () => {
  // const navigate = useNavigate();
  const auth = useAuth();
  const { user } = auth;
  console.log("user", user);
  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    if(auth.error.message == "Popup closed by user") {
      auth.signinPopup();
    }
    return <div>Oops... {auth.error.message}</div>;
  }

  // if (!auth.isAuthenticated) {
  //   auth.signinPopup();
  // }
    return (
        <RouterProvider router={router} />
    );
}