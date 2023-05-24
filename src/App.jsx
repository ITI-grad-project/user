import { useState } from "react";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <>
      <NavBar />
      <ProductCard />
      <Footer />
    </>
  );
}

export default App;
