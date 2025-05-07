import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./componants/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Profile from "./pages/Profile";
import Collections from "./pages/Collections";
import Checkout from "./componants/Cart/Checkout";
import OrderConfirmation from "./componants/Cart/OrderConfirmation";
import OrderDetails from "./componants/Product/OrderDetails";
import MyAllOrders from "./componants/Cart/MyAllOrders";
import AdminLayout from "./componants/Admin/AdminLayout";
import AdminHomePage from "./componants/Admin/AdminHomePage";
import UserManagement from "./componants/Admin/UserManagement";
import AdminProducts from "./componants/Admin/AdminProducts";
import EditProduct from "./componants/Admin/EditProduct";
import ManageOrders from "./componants/Admin/ManageOrders";
import ProtectedRoute from "./componants/Comman/ProtectedRoute";
import AdminNewProducts from "./componants/Admin/AdminNewProducts";
import ProductDetails from "./componants/Product/ProductDetails";


const App = () => {
  return <>
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<UserLayout />} >
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/collections/:collection" element={<Collections />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/my-orders" element={<MyAllOrders />} />
        </Route>
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminHomePage />}/>
          <Route path="user" element={<UserManagement />}/>
          <Route path="products" element={<AdminProducts />}/>
          <Route path="products/edit/:id" element={<EditProduct />}/>
          <Route path="orders" element={<ManageOrders />} />
          <Route path="new-product" element={<AdminNewProducts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
};

export default App;
