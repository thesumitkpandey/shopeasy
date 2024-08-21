import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";

import Cart from "./pages/Cart.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
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
import OrdersList from "./pages/admin/OrdersList.jsx";
import Error from "./components/errors/Error.jsx";
import productDetailLoader from "./utils/productDetailsLoader.js";
import allOrdersLoader from "./utils/allOrdersLoader.js";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route
        path="/products/:id"
        loader={productDetailLoader}
        element={<ProductDetail />}
      />
      <Route path="/:category" element={<Category />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmorder" element={<ConfirmOrder />} />
        <Route path="/orders/:id" element={<OrderDescription />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/orders"
          loader={myOrdersLoader}
          errorElement={<Error />}
          element={<MyOrders />}
        />
      </Route>
      <Route path="/" element={<AdminPrivateRoute />}>
        <Route
          path="/admin/orders"
          element={<OrdersList />}
          loader={allOrdersLoader}
          errorElement={<Error />}
        />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
