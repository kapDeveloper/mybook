import React, { useEffect, useState } from "react";
import { useGetIncomesQuery } from "@/services/incomeApi";
import { useGetExpensesQuery } from "@/services/expenseApi";

function TotalComponents() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  const { data, isLoading, error } = useGetIncomesQuery();

  const { data: expense } = useGetExpensesQuery();

  useEffect(() => {
    if (data) {
      const totalIncome = data.reduce(
        (acc, item) => acc + parseFloat(item.amount) || 0,
        0
      );
      setIncomeTotal(totalIncome);
    }
  }, [data]);

  useEffect(() => {
    if (expense) {
      const expenseTotal = expense.reduce(
        (acc, item) => acc - parseFloat(item.amount) || 0,
        0
      );
      setExpenseTotal(expenseTotal);
    }
  }, [expense]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data!</p>;

  return (
    <div>
      <h6 className="text-center text-pink-500">
        Your Balance:{" "}
        <span
          className={`ml-2 ${
            incomeTotal + expenseTotal < 0 ? "!text-red-500" : "!text-green-500"
          }`}
        >
          $ {(incomeTotal + expenseTotal).toFixed(2)}
        </span>
      </h6>
      <div className="grid grid-cols-2 gap-10 mt-10 w-full pl-5">
        <div>
          <p className="!text-green-500 text-2xl mb-2">Income</p>
          <p className="!text-green-500">${incomeTotal.toFixed(2)}</p>
        </div>
        <div>
          <p className="!text-red-600 text-2xl mb-2">Expense</p>
          <p className="!text-red-600">${expenseTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default TotalComponents;
