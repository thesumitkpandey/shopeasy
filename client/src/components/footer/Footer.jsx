//FOOTER IS COMPLETE
import React from "react";
import Social from "./Social";
import Links from "./Links";
import Contact from "./Contact";

export default function Footer() {
  return (
    <footer className="bg-[rgb(33,33,33)] py-8 mt-8 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Social />
          <Links />
          <Contact />
        </div>
      </div>
    </footer>
  );
}
