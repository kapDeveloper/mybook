"use client";
import React, { useEffect, useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import Tooltip from "./Tooltip";
import CenterModel from "./models/CenterModel";
import TabButton from "./TabButton";
import { toast } from "react-toastify";

import {
  useGetIncomesQuery,
  useDeleteIncomeMutation,
} from "@/services/incomeApi";

import {
  useGetExpensesQuery,
  useDeleteExpenseMutation,
} from "@/services/expenseApi";
import Image from "next/image";

function CenterContainer() {
  // expense
  const { data: expense } = useGetExpensesQuery();
  const [deleteExpense] = useDeleteExpenseMutation();

  // income
  const { data, error, isLoading } = useGetIncomesQuery();

  const [deleteIncome, refetch] = useDeleteIncomeMutation();
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [selectbtn, setSelectbtn] = useState(0);
  const [modeltype, setModeltype] = useState();
  const [selctEditId, setSelctEditId] = useState();

  const rendomColor = ["red", "green", "blue", "#c3c388"];

  const testfn = (id) => {
    setIsOpenModel(true);
    setModeltype("edit");
    setSelctEditId(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const handleDelete = async (postId) => {
    try {
      await deleteIncome(postId).unwrap();

      toast.success("Income Deleted successfully!");

      refetch();
    } catch (error) {
      console.error("Failed to delete the post:", error);
    }
  };

  const handleExpenseDelete = async (postId) => {
    try {
      await deleteExpense(postId).unwrap();

      toast.success("Income Deleted successfully!");

      refetch();
    } catch (error) {
      console.error("Failed to delete the post:", error);
    }
  };

  return (
    <>
      <TabButton selectbtn={selectbtn} setselectbtn={setSelectbtn} />
      {!selectbtn ? (
        <div className="flex flex-col gap-3 mt-5 h-[500px] overflow-auto">
          {data?.map((item, index) => {
            const backgroundColor = rendomColor[index % rendomColor.length];
            return (
              <Tooltip
                text={"Edit"}
                rt={true}
                fn={() => testfn(item._id)}
                tp={"-10px"}
                key={item._id}
              >
                <div className="rounded-md p-2 shadow-lightmodeclick dark:shadow-buttonclick flex items-center justify-between z-10">
                  <div className="flex items-center gap-4 sm:gap-10">
                    {item.img ? (
                      <Image
                        src={item.img}
                        style={{ backgroundColor }}
                        className="w-12 p-0 h-12 rounded-full"
                        alt=""
                        width={10}
                        height={10}
                      />
                    ) : (
                      <p
                        className="w-12 p-1 h-12 rounded-full grid place-content-center font-bold text-2xl capitalize"
                        style={{ backgroundColor }}
                      >
                        {item.income_source.charAt(0)}
                      </p>
                    )}

                    <p className="text-lg text-white text-ellipsis line-clamp-1 w-[150px] overflow-hidden sm:w-[250px]">
                      {item.income_source}
                    </p>
                    <p className="text-green-500">${item?.amount}</p>
                  </div>
                  <RiCloseLargeFill
                    onClick={() => handleDelete(item._id)}
                    className="text-[26px] min-w-[20px] text-white active:scale-90"
                  />
                </div>
              </Tooltip>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-5 h-[500px] overflow-auto">
          {expense?.map((item, index) => {
            const backgroundColor = rendomColor[index % rendomColor.length];
            return (
              <Tooltip
                text={"Edit"}
                rt={true}
                fn={() => testfn(item._id)}
                tp={"-10px"}
                key={item._id}
              >
                <div className="rounded-md p-2 shadow-lightmodeclick dark:shadow-buttonclick flex items-center justify-between z-10">
                  <div className="flex items-center gap-4 sm:gap-10">
                    {item.img ? (
                      <Image
                        src={item.img}
                        style={{ backgroundColor }}
                        className="w-12 p-0 h-12 rounded-full"
                        alt=""
                        width={10}
                        height={10}
                      />
                    ) : (
                      <p
                        className="w-12 p-1 h-12 rounded-full grid place-content-center font-bold text-2xl capitalize"
                        style={{ backgroundColor }}
                      >
                        {item.expense_source.charAt(0)}
                      </p>
                    )}

                    <p className="text-lg text-white text-ellipsis line-clamp-1 w-[150px] overflow-hidden sm:w-[250px]">
                      {item.expense_source}
                    </p>
                    <p className="text-green-500">${item?.amount}</p>
                  </div>
                  <RiCloseLargeFill
                    onClick={() => handleExpenseDelete(item._id)}
                    className="text-[26px] min-w-[20px] text-white active:scale-90"
                  />
                </div>
              </Tooltip>
            );
          })}
        </div>
      )}

      <CenterModel
        isOpenModel={isOpenModel}
        setIsOpenModel={setIsOpenModel}
        modeltype={modeltype}
        selctEditId={selctEditId}
        selectbtn={selectbtn}
      />
    </>
  );
}

export default CenterContainer;
