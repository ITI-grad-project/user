
import Login from "../src/pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import NewPassword from "./pages/NewPassword";
import VerifyCode from "./pages/VerifyCode";





  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotPassword" element={<ForgetPassword />} />
          <Route path="/newPassword" element={<NewPassword />} />
          <Route path="/verify" element={<VerifyCode />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
