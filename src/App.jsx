import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import Signup from "./pages/Signup";
import NewPassword from "./pages/NewPassword";
import VerifyCode from "./pages/VerifyCode";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProudctDetails";
import { useDebounce } from "use-debounce";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ProductsProvider } from "./context/ProductContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Favorite from "./pages/Favourite";
import AddProduct from "./pages/AddProduct";
import CheckOut from "./pages/CheckOut";
import ProfileUser from "./pages/profileUser";
import About from "./pages/About";
import Contact from "./pages/ContactUs";
import Error from "./pages/Error";

function App() {
  const [listOfCategories, setListOfCategories] = useState([]);
  const [loginState, setLoginState] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [wishlistedItems, setWishlistedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedValue] = useDebounce(searchQuery, 1000);

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
      <GoogleOAuthProvider clientId="154586784948-llp5irti4qcc37h2a0b6j7lr5fddr2k1.apps.googleusercontent.com">
        <BrowserRouter>
          <ProductsProvider>
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
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
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

                <Route path="/about" element={<About />} />

                <Route path="/checkout/:id" element={<CheckOut />} />

                <Route
                  path="/shop/:id?"
                  element={
                    <Shop
                      Categories={listOfCategories}
                      loginState={loginState}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      debouncedValue={debouncedValue}
                    />
                  }
                />
                <Route
                  path="/productDetails/:productId"
                  element={
                    <ProductDetails
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                      loginState={loginState}
                      wishlistedItems={wishlistedItems}
                      setWishlistedItems={setWishlistedItems}
                    />
                  }
                ></Route>
                <Route
                  path="/userProfile/:id"
                  element={<ProfileUser />}
                ></Route>

                <Route
                  path="/addProduct/:id"
                  element={<AddProduct listOfCategories={listOfCategories} />}
                />

                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Error />} />
              </Route>
            </Routes>
            {/* <Footer /> */}
          </ProductsProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
