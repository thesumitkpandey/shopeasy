import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function PopUp({ status, message }) {
  useEffect(() => {
    toast[status](message);
  }, [message]);

  return (
    <div>
      <Toaster />
    </div>
  );
}
