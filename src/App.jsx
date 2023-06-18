import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import Signup from "./pages/Signup";
import NewPassword from "./pages/NewPassword";
import VerifyCode from "./pages/VerifyCode";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProudctDetails";

import { ProductsProvider } from "./context/ProductContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Favorite from "./pages/Favourite";
import AddProduct from "./pages/AddProduct";
import CheckOut from "./pages/CheckOut";
import About from "./pages/About";

function App() {
  const [listOfCategories, setListOfCategories] = useState([]);
  const [loginState, setLoginState] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  console.log("cartItems from app", cartItems);

  const BaseURL = "https://bekya.onrender.com";

  useEffect(() => {
    async function getAllCategories() {
      const { data } = await axios.get(`${BaseURL}/api/v1/categories`);
      setListOfCategories(data.data);
    }
    getAllCategories();
  }, []);

  return (
    <>
      <BrowserRouter>
        <ProductsProvider>
          {/* <NavBar listOfCategories={listOfCategories} /> */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotPassword" element={<ForgetPassword />} />
            <Route path="/newPassword" element={<NewPassword />} />
            <Route path="/verify" element={<VerifyCode />} />
            <Route
              path="/"
              element={
                <Layout
                  listOfCategories={listOfCategories}
                  setLoginState={setLoginState}
                  loginState={loginState}
                />
              }
            >
              <Route
                index
                element={
                  <Home
                    listOfCategories={listOfCategories}
                    setLoginState={setLoginState}
                    loginState={loginState}
                  />
                }
              />
              <Route path="/profile" element={<Profile />} />

              <Route
                path="/cart"
                element={
                  <Cart cartItems={cartItems} setCartItems={setCartItems} />
                }
              />
              <Route
                path="/favorite"
                element={<Favorite setCartItems={setCartItems} />}
              />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/shop"
                element={
                  <Shop Categories={listOfCategories} loginState={loginState} />
                }
              />
              <Route
                path="/productDetails/:productId"
                element={<ProductDetails />}
              />
              <Route
                path="/addProduct/:id"
                element={<AddProduct listOfCategories={listOfCategories} />}
              />
            </Route>
          </Routes>
          {/* <Footer /> */}
        </ProductsProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
