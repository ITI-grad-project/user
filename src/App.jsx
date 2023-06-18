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

function App() {
  const [listOfCategories, setListOfCategories] = useState([]);
  const [loginState, setLoginState] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [wishlistedItems, setWishlistedItems] = useState([]);

  console.log("cartItems from app", cartItems);

  const BaseURL = "https://bekya.onrender.com";

  useEffect(() => {
    setIsCategoryLoading(true);
    async function getAllCategories() {
      const { data } = await axios.get(`${BaseURL}/api/v1/categories`);
      setIsCategoryLoading(false);
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
                    isCategoryLoading={isCategoryLoading}
                    wishlistedItems={wishlistedItems}
                    setWishlistedItems={setWishlistedItems}
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
                element={
                  <Favorite
                    setCartItems={setCartItems}
                    wishlistedItems={wishlistedItems}
                    setWishlistedItems={setWishlistedItems}
                  />
                }
              />
              <Route path="/checkout/:id" element={<CheckOut />} />
              <Route
                path="/shop/:id?"
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
