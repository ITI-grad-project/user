import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import ProductDetails from "./pages/ProudctDetails";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/productDetails" element={<ProductDetails />} />
        {/* <Route path="*" element={<Error />} /> */}
      </>
    )
  );

  return (
    <>
      <div>
        <RouterProvider router={router}/>
      </div>
    </>
  );
}

export default App;
