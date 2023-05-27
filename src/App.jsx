import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
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
          </Routes>
          <Footer />
        </ProductsProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
