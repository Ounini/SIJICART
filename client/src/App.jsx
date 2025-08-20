import "./css/App.css";
import "./css/Snippet.css";
import "./css/Breaks.css";

import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./middleware/ProtectedRoute";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import HomeManager from "./managers/HomeManager";
import Layout from "./components/Layout";

import NotFound from "./pages/NotFound";

import ManageProducts from "./pages/adminPages/ManageProducts";
import EditProduct from "./pages/adminPages/EditProduct";
import AdminProductDetails from "./pages/adminPages/AdminProductDetails";
import Admin from "./pages/adminPages/Admin";
import AddProduct from "./pages/adminPages/AddProduct";
import ProtectedAdmin from "./middleware/ProtectedAdmin";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { useProduct } from "./context/ProductContext";
import Orders from "./pages/Orders";
import ManageOrders from "./pages/adminPages/ManageOrders";
import EditOrder from "./pages/adminPages/EditOrder";
import OrderDetails from "./pages/adminPages/OrderDetails";
import ManageUsers from "./pages/adminPages/ManageUsers";
import EditUser from "./pages/adminPages/EditUser";
import UserDetails from "./pages/adminPages/UserDetails";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Policy from "./pages/Policy";
import NewIn from "./pages/NewIn";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { Container } from "react-bootstrap";
import VerifiedEmail from "./pages/VerifiedEmail";

function App() {
  const { products } = useProduct();

  return (
    <>
      <div className="colored position-fixed top-0 w-100 z-1050"></div>
      <Container></Container>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeManager />} />

          <Route path="/newIn" element={<NewIn />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route path="/:category/:subCategory" element={<ProductCategory />} />
          <Route
            path="/:category/:subCategory/:productName"
            element={<ProductDetails />}
          />

          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />

          <Route path="policy" element={<Policy />} />

          <Route path="search" element={<Search products={products} />} />

          <Route path="cart" element={<Cart />} />

          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verifyEmail/:token" element={<VerifiedEmail />} />

          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route path="/success" element={<Success />} />
          <Route path="/my-orders" element={<Orders />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <Layout />
            </ProtectedAdmin>
          }
        >
          <Route index element={<Admin />} />
          <Route path="manageProducts" element={<ManageProducts />} />
          <Route path="manageProducts/addProduct" element={<AddProduct />} />
          <Route
            path="manageProducts/editProduct/:id"
            element={<EditProduct />}
          />
          <Route
            path="manageProducts/details/:id"
            element={<AdminProductDetails />}
          />

          <Route path="manageOrders" element={<ManageOrders />} />
          {/* <Route path="manageOrders/addOrder" element={<ManageOrders />} /> */}
          <Route path="manageOrders/details/:id" element={<OrderDetails />} />
          <Route path="manageOrders/editOrder/:id" element={<EditOrder />} />

          <Route path="users" element={<ManageUsers />} />
          <Route path="users/editUser/:id" element={<EditUser />} />
          <Route path="users/details/:id" element={<UserDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
