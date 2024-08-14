"use client";
import React, { useEffect, useState } from "react";
import { useGetIncomesQuery } from "@/services/incomeApi";
import { useGetExpensesQuery } from "@/services/expenseApi";

function TotalComponents() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0); // This will be 0 if no expense data available

  const { data, isLoading, error } = useGetIncomesQuery();

  const { data: expense, refetch } = useGetExpensesQuery();

  const result = data?.map((a) => a.amount);

  // Calculate totals whenever the data changes
  useEffect(() => {
    if (data) {
      // Summing up income amounts (assuming all data are incomes as no expense data is provided)
      const totalIncome = data.reduce(
        (acc, item) => acc + parseFloat(item.amount) || 0,
        0
      );
      setIncomeTotal(totalIncome);
    }
  }, [data, expense]);

  useEffect(() => {
    if (expense) {
      // Summing up income amounts (assuming all data are incomes as no expense data is provided)
      const totalExpense = expense.reduce(
        (acc, item) => acc - parseFloat(item.amount) || 0,
        0
      );
      setExpenseTotal(totalExpense);
    }
  }, [data, expense]);

  useEffect(() => {
    if (result?.length === 0) {
      setExpenseTotal(0);
      refetch();
    }
  }, [data, expense]);

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
