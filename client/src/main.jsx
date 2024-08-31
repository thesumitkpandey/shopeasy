import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Cart from "./pages/Cart.jsx";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Category from "./pages/Category.jsx";
import Signin from "./pages/Signin.jsx";
import SignUp from "./pages/SingUp.jsx";
import Shipping from "./pages/Shipping.jsx";
import PrivateRoute from "./components/private/PrivateRoute.jsx";
import Payment from "./pages/Payment.jsx";
import ConfirmOrder from "./pages/ConfirmOrder.jsx";
import OrderDescription from "./pages/OrderDescription.jsx";
import Profile from "./pages/Profile.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import myOrdersLoader from "./utils/myOrdersLoader.js";
import AdminPrivateRoute from "./components/private/AdminPrivateRoute.jsx";
import Orders from "./pages/admin/Orders.jsx";
import Error from "./components/errors/Error.jsx";
import productDetailLoader from "./utils/productDetailsLoader.js";
import allOrdersLoader from "./utils/allOrdersLoader.js";
import Products from "./pages/admin/Products.jsx";
import Users from "./pages/admin/Users.jsx";
import allUsersLoader from "./utils/allUsersLoader.js";
import allProducstLoaders from "./utils/allProductLoader.js";
import ModifyProduct from "./pages/admin/ModifyProduct.jsx";

import Dashboard from "./pages/admin/Dashboard.jsx";
import allProducstLoadersForUsers from "./utils/allProducstLoadersForUsers.js";
import SearchBox from "./pages/SearchBox.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: allProducstLoadersForUsers,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
        loader: productDetailLoader,
      },
      {
        path: ":category",
        element: <Category />,
        loader: allProducstLoadersForUsers,
      },
      {
        path: "search",
        element: <SearchBox />,
        loader: allProducstLoadersForUsers,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          {
            path: "shipping",
            element: <Shipping />,
          },
          {
            path: "payment",
            element: <Payment />,
          },
          {
            path: "confirmorder",
            element: <ConfirmOrder />,
          },
          {
            path: "orders/:id",
            element: <OrderDescription />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "orders",
            element: <MyOrders />,
            loader: myOrdersLoader,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: "/",
        element: <AdminPrivateRoute />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
            errorElement: <Error />,
          },
          {
            path: "admin-orders",
            element: <Orders />,
            loader: allOrdersLoader,
            errorElement: <Error />,
          },
          {
            path: "admin-products",
            element: <Products />,
            loader: allProducstLoaders,
          },
          {
            path: "admin-users",
            element: <Users />,
            loader: allUsersLoader,
            errorElement: <Error />,
          },
          {
            path: "admin-products/:id",
            element: <ModifyProduct />,
            loader: productDetailLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
