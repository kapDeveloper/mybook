"use client";
import React, { useEffect, useState } from "react";
import IconItem from "./Componets/IconItem";
import { useSelector } from "react-redux";

function IconCounter() {
  const [incomeTotal, setTotalAmount] = useState(0);

  //   const singledata = useSelector((state) => state.items.singalIcon);

  //   useEffect(() => {
  //     const total = singledata.reduce(
  //       (acc, item) => acc + item.amount * item.qly,
  //       0
  //     );
  //     setTotalAmount(total);
  //   }, [singledata]);

  return (
    <div className="bg-[#ead6d6] dark:bg-[#3f2727]  w-full flex flex-col justify-center">
      <h1 className="text-center text-3xl">Totls Amount :- ${incomeTotal}</h1>
      <IconItem />
    </div>
  );
}

export default IconCounter;
