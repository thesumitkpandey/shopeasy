import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import { useState } from "react";
export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <nav className="shadow-lg">
      <TopNav setNavbarOpen={setNavbarOpen} navbarOpen={navbarOpen} />
      <BottomNav navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
    </nav>
  );
}
