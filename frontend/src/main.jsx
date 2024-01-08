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
// import './assets/styles/index.css';

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route index={true} path="/profile" element={<ProfileScreen />} />
      <Route index={true} path="/item-list" element={<ItemScreen />} />
      <Route index={true} path="/item-list/item-details/:id" element={<ItemDetailsScreen />} />
      <Route index={true} path="/category" element={<CategoryScreen />} />
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
      <Route
        index={true}
        path="/admin/add-category"
        element={<AddCategoryScreen />}
      />
      <Route index={true} path="/admin/add-item" element={<AddItemScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
