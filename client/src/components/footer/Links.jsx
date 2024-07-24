import React from "react";
import LinkItems from "./LinkItems";
import { Link } from "react-router-dom";
export default function Links() {
  return (
    <div className="flex flex-col space-y-2 mb-4 md:mb-0">
      <LinkItems name="Contact" />
      <LinkItems name="Feedback" />
      <LinkItems name="FAQ" />
    </div>
  );
}
