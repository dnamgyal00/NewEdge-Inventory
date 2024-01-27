import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store.js";

import App from "./App.jsx";
import "./assets/styles/bootstrap.custom.css";
import { Navigate } from "react-router-dom";

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
import ScheduleReport from "./screens/ScheduleReport.jsx";
import ItemDetailsScreen from "./screens/ItemDetailsScreen.jsx";
import CategoryDetailsScreen from "./screens/CategoryDetailsScreen.jsx";
import Error from "./Error404.jsx";
import CategoryAddItemScreen from "./screens/CategoryAddItemScreen.jsx";
import ItemStockInScreen from "./screens/ItemStockInScreen.jsx";
import ItemStockOutScreen from "./screens/ItemStockOutScreen.jsx";
import ItemEditScreen from "./screens/ItemEditScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route index={true} path="/home" element={<HomeScreen />} />
        <Route index={true} path="/profile" element={<ProfileScreen />} />

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
          path="/schedule-report"
          element={<ScheduleReport />}
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
