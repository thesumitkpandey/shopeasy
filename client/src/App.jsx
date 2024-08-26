import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useNavigation } from "react-router-dom";
import Loading from "./components/errors/Loading";
import { useSelector } from "react-redux";
import AdminSidebar from "./components/admin/AdminSidebar";
export default function App() {
  const navigation = useNavigation();

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {userInfo ? userInfo.isAdmin ? <AdminSidebar /> : <Navbar /> : <Navbar />}
      {navigation.state == "loading" ? (
        <Loading />
      ) : (
        <main>
          <Outlet />
        </main>
      )}
      {userInfo ? userInfo.isAdmin ? <></> : <Footer /> : <Footer />}
      <div>
        <Toaster />
      </div>
    </>
  );
}
