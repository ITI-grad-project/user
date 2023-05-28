import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";

import { useEffect, useState } from "react";

import ProductDetails from "./pages/ProudctDetails";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ProductCard from "./components/ProductCard";
import Shop from "./pages/Shop";
import Home from "./pages/Home";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios.get(
          "https://bekya.onrender.com/api/v1/categories"
        );
        setCategories(data);
      } catch (error) {
        // TODO: handle error
      }
    }

    getCategories();
  }, []);

  console.log("category", categories.data);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/productDetails" element={<ProductDetails />} />
        <Route path="/shop" element={<Shop Categories={categories?.data} />} />
        {/* <Route path="*" element={<Error />} /> */}
      </>
    )
  );

  return (
    <>
      <NavBar />
      <div>
        <RouterProvider router={router} />
      </div>
      <Footer />
    </>
  );
}

export default App;
