import React from "react";

export default function BottomNavItem({ name }) {
  return (
    <div className="text-3xl hover:underline md:mx-4 ease-in duration-1000 transition delay-0">
      {name}
    </div>
  );
}
