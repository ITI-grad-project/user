import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = ({
  listOfCategories,
  setLoginState,
  loginState,
  searchQuery,
  setSearchQuery,
}) => {
  const location = useLocation();

  // Check if the current route is the login route
  const isLoginRoute = location.pathname === "/login";
  const isSignUpRoute = location.pathname === "/signup";
  const isForgetPasswordRoute = location.pathname === "/forgotPassword";
  const isVerifyRoute = location.pathname === "/verify";
  const isNewPasswordRoute = location.pathname === "/newPassword";
  // const isErrorRoute = location.pathname === "/*";

  if (
    isLoginRoute ||
    isSignUpRoute ||
    isForgetPasswordRoute ||
    isVerifyRoute ||
    isNewPasswordRoute
  ) {
    return <Outlet />;
  } else {
    return (
      <>
        <NavBar
          listOfCategories={listOfCategories}
          setLoginState={setLoginState}
          loginState={loginState}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Outlet />
        <Footer listOfCategories={listOfCategories} />
      </>
    );
  }
};

export default Layout;
