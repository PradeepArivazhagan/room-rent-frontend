import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const jwtToken = Cookies.get("jwt_token");
  const auth = jwtToken !== undefined;
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
