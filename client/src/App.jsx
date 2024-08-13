import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <div>
        <Toaster />
      </div>
    </>
  );
}
