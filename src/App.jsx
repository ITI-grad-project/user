import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import ProductDetails from "./pages/ProudctDetails";

import { useState } from "react";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ProductCard from "./components/ProductCard";
import Home from "./pages/Home";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/productDetails" element={<ProductDetails />} />
        {/* <Route path="*" element={<Error />} /> */}
      </>
    )
  );

  return (
    <>

      <NavBar />
      <div>
        <RouterProvider router={router}/>
      </div>

      {/* <ProductCard /> */}
      <Footer />

    </>
  );
}

export default App;
