import React from "react";
import { Link } from "react-router-dom";
import StepsItems from "./StepsItems";
export default function Steps({ step1, step2, step3, step4 }) {
  return (
    <div className="flex justify-center my-6">
      <div className="flex items-center w-full max-w-4xl">
        <div className="flex items-center space-x-4 w-full">
          <StepsItems name="SignIn" stepRank={step1} stepNumber={1} />
          <div className="w-10 h-1 bg-gray-300"></div>
          <StepsItems name="Shipping" stepRank={step2} stepNumber={2} />
          <div className="w-10 h-1 bg-gray-300"></div>
          <StepsItems name="Payment" stepRank={step3} stepNumber={3} />
          <div className="w-10 h-1 bg-gray-300"></div>
          <StepsItems name="Confirmation" stepRank={step4} stepNumber={4} />
        </div>
      </div>
    </div>
  );
}
