import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/signin" replace={true} />;
};
