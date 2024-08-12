import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function TotalComponets() {
  // const income = useSelector((state) => state.items.income);
  // const ex = useSelector((state) => state.items.expanse);
  const [incomeTotle, setIncomeTotle] = useState(0);
  const [expanse, setExpanse] = useState(0);

  // useEffect(() => {
  //   const totalIncome = income.reduce(
  //     (acc, item) => acc + parseFloat(item.amount),
  //     0
  //   );
  //   setIncomeTotle(totalIncome);
  // }, [income]);

  // useEffect(() => {
  //   const totalExpanse = ex.reduce(
  //     (acc, item) => acc + parseFloat(item.amount),
  //     0
  //   );
  //   setExpanse(totalExpanse);
  // }, [ex]);

  return (
    <div>
      <h6 className="text-center text-pink-500">
        Your Balance :-{" "}
        <span
          className={`ml-2 ${
            incomeTotle - expanse < 0 ? "!text-red-500" : "!text-green-500"
          } `}
        >
          $ {incomeTotle - expanse}
        </span>
      </h6>
      <div className="grid grid-cols-2 gap-10 mt-10 w-full pl-5">
        <div className="border-r-white border-r-[2px]">
          <p className="!text-green-500 text-2xl mb-2">income</p>
          <p className="!text-green-500">{incomeTotle}</p>
        </div>
        <div>
          <p className="!text-red-600 text-2xl mb-2">expanse</p>
          <p className="!text-red-600">{expanse}</p>
        </div>
      </div>
    </div>
  );
}

export default TotalComponets;
