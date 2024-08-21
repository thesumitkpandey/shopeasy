import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useNavigation } from "react-router-dom";
import Loading from "./components/errors/Loading";
export default function App() {
  const navigation = useNavigation();
  return (
    <>
      <Navbar />
      {navigation.state == "loading" ? (
        <Loading />
      ) : (
        <main>
          <Outlet />
        </main>
      )}
      <Footer />
      <div>
        <Toaster />
      </div>
    </>
  );
}
