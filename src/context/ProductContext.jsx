import { createContext, useState } from "react";

const ProductContext = createContext();

export function ProductsProvider({ children }) {
  const [listOfProducts, setListOfProducts] = useState([]);

  return (
    <ProductContext.Provider value={{ listOfProducts, setListOfProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
