//START WITH EIDTING THE PRODUCTS LIST AND VIDEO LIST PRODUCTS SKIP REACT ROUTER IMPLEMENTATION
import Footer from "./features/footer/Footer";
import Navbar from "./features/navbar/Navbar";
import { Outlet } from "react-router-dom";
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
