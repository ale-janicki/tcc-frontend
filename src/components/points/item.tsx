"use client";
import { useState } from "react";
import { FaGift } from "react-icons/fa";

export default function Item() {

  const [showHide, setShowHide] = useState("hidden")

  const toggleDisplay = () => {
    setShowHide(showHide == "hidden" ? "flex" : "hidden")
  }

  return (
    <div className="bg-darkGrey-500 h-full w-11/12 mx-auto rounded-xl">
      <div className="grid grid-cols-3 p-2"  onClick={toggleDisplay}>
        <div className=" col-span-2 mr-4 md:mx-6">
          <h2 className=" font-audiowide text-primary-500 text-2xl text-center md:text-4xl md:mt-4">Item</h2>
          <p className="text-sm text-justify mt-2 md:text-lg md:mt-4"> Lorem ipsum dolor sit amet.</p>
          <div className="flex justify-between text-sm my-2 md:text-lg md:my-4">
            <p> Valor: </p>
            <p>2 pts.</p>
          </div>
        </div>
        <div className="h-full w-full bg-primary-500 rounded-lg flex items-center justify-center">
          <FaGift className="text-white text-4xl md:text-6xl" aria-hidden />
        </div>
      </div>
      <div className={`bg-primary-500 justify-between p-2 text-white font-audiowide rounded-b-lg ${showHide} md:text-xl md:p-6`}>
        <h2>Resgatar</h2>
        <h2>➜</h2>
      </div>
    </div>
  );
}
