import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center bg-white min-h-screen">
      <div className="flex space-x-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-myYellow"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-myGray"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-myYellow"></div>
      </div>
    </div>
  );
}
