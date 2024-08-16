"use client";
import React, { useEffect, useState } from "react";
import IconItem from "./Componets/IconItem";
import { useGetSingleIconsQuery } from "@/services/singleIconApi";
function IconCounter() {
  const [incomeTotal, setTotalAmount] = useState(0);
  const { data: singleIconData } = useGetSingleIconsQuery();

  useEffect(() => {
    if (singleIconData) {
      const total = singleIconData.reduce(
        (acc, item) => acc + parseFloat(item.amount) || 0,
        0
      );
      setTotalAmount(total);
    }
  }, [singleIconData]);

  return (
    <div className="bg-[#ead6d6] dark:bg-[#3f2727]  w-full flex flex-col justify-center">
      <h1 className="text-center text-3xl">Totls Amount :- ${incomeTotal}</h1>
      <IconItem />
    </div>
  );
}

export default IconCounter;
