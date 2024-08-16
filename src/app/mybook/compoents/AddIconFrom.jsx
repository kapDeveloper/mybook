"use client";
import React, { lazy, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  useGetExpensesQuery,
  useDeleteExpenseMutation,
} from "@/services/expenseApi";
import {
  useGetIncomesQuery,
  useDeleteIncomeMutation,
} from "@/services/incomeApi";
const Tooltip = lazy(() => import("./Tooltip"));
const CenterModel = lazy(() => import("./models/CenterModel"));

function AddIconFrom() {
  const [addIconFormFlag, setAddIconFlag] = useState(false);
  // expense
  const { data: expense } = useGetExpensesQuery();
  const [deleteExpense] = useDeleteExpenseMutation();

  // income
  const { data: income, error, isLoading } = useGetIncomesQuery();
  const [deleteIncome] = useDeleteIncomeMutation();

  const [isOpenModel, setIsOpenModel] = useState(false);
  const [selectbtn, setselectbtn] = useState(0);
  const [showdata, setShowdata] = useState(income);
  const [modeltype, setModeltype] = useState();

  useEffect(() => {
    selectbtn == 0 ? setShowdata(income) : setShowdata(expense);
  }, [selectbtn, income, expense]);

  const testfn = (id) => {
    selectbtn == 0
      ? (deleteIncome(id).unwrap(), toast(" income icon data deleted!"))
      : (deleteExpense(id).unwrap(), toast("expense icon data deleted!"));
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setselectbtn(0)}
          className={`min-h-[50px]  w-full rounded-lg text-white font-bold ${
            selectbtn == 0
              ? "shadow-lightmodeclick dark:shadow-buttonclick"
              : "shadow-lightmode dark:shadow-customshadow"
          } `}
        >
          income
        </button>
        <button
          onClick={() => setselectbtn(1)}
          className={`min-h-[50px]  w-full rounded-lg text-white font-bold ${
            selectbtn == 1
              ? "shadow-lightmodeclick dark:shadow-buttonclick"
              : "shadow-lightmode dark:shadow-customshadow"
          } `}
        >
          expense
        </button>
      </div>
      <div className="flex flex-wrap gap-4  mt-5">
        <div
          onClick={() => {
            setIsOpenModel(true), setModeltype("add"), setAddIconFlag(true);
          }}
          className="w-24 grid place-content-center text-3xl hover:bg-[#91565663] rounded-full  h-24 border-dashed border-2"
        >
          +
        </div>

        {showdata?.map((item) => {
          return (
            <>
              <Tooltip text={"remove"} fn={() => testfn(item._id)}>
                <div onClick={() => handlingadditem(item)}>
                  <div className="w-24  text-3xl hover:bg-gray-200 dark:hover:bg-[#91565663] rounded-full  h-24 border-dashed border-2 p-2">
                    <Image
                      className="w-full h-full  rounded-full"
                      src={item.img ? item.img : "/assets/images/shirt.png"}
                      alt=""
                      width={96}
                      height={96}
                    />
                  </div>
                  <p className="pl-3 text-sm">
                    {item.income_source || item.expense_source}
                  </p>
                </div>
              </Tooltip>
            </>
          );
        })}
      </div>

      <CenterModel
        isOpenModel={isOpenModel}
        setIsOpenModel={setIsOpenModel}
        selectbtn={selectbtn}
        modeltype={modeltype}
        addIconFormFlag={addIconFormFlag}
      />
    </>
  );
}

export default AddIconFrom;
