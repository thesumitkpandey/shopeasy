import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PrivateRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/signin" replace={true} />;
  }

  return userInfo ? <Outlet /> : <Navigate to="/signin" replace={true} />;
}
