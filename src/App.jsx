import { useState } from "react";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ProductCard from "./components/ProductCard";
import Shop from "./pages/Shop";

function App() {
  return (
    <>
      <NavBar />
      {/* <ProductCard /> */}
      <Shop />
      <Footer />
    </>
  );
}

export default App;
