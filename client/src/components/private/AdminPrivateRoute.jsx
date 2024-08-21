import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminPrivateRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/signin" replace={true} />;
  }

  return userInfo &&
    (userInfo.isAdmin === true || userInfo.isAdmin === "true") ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace={true} />
  );
}
