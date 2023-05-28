import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import Signup from "./pages/Signup";
import NewPassword from "./pages/NewPassword";
import VerifyCode from "./pages/VerifyCode";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProudctDetails";

import { ProductsProvider } from "./context/ProductContext";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [listOfCategories, setListOfCategories] = useState([]);

  const BaseURL = "https://bekya.onrender.com";

  useEffect(() => {
    async function getAllCategories() {
      const { data } = await axios.get(`${BaseURL}/api/v1/categories`);
      setListOfCategories(data.data);
      console.log("category data", data.data);
    }
    getAllCategories();
  }, []);

  return (
    <>
      <BrowserRouter>
        <ProductsProvider>
          <NavBar listOfCategories={listOfCategories} />
          <Routes>
            <Route
              path="/"
              element={<Home listOfCategories={listOfCategories} />}
            />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotPassword" element={<ForgetPassword />} />
          <Route path="/newPassword" element={<NewPassword />} />
          <Route path="/verify" element={<VerifyCode />} />
          <Route path="/productDetails/:productId" element={<ProductDetails />} />
          <Route
            path="/shop"
            element={
              <Shop
                Items={items?.data}
                Categories={categories?.data}
                Pagination={items?.pagination}
              />
            }
          />
          </Routes>
          <Footer />
        </ProductsProvider>
      </BrowserRouter>

    </>
  );
}

export default App;
