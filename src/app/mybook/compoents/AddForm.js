"use client";
import React, { useRef, useState } from "react";
import {
  useCreateIncomeMutation,
  useGetIncomesQuery,
} from "@/services/incomeApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useCreateExpenseMutation } from "@/services/expenseApi";

///

function AddForm() {
  //

  const [selectbtn, setselectbtn] = useState(0);

  const { data } = useGetIncomesQuery();
  console.log("IncomeDetails", data);

  const result = data?.map((a) => a.amount);
  console.log("result", result);

  const [createIncome, { refetch }] = useCreateIncomeMutation();
  const [createExpense] = useCreateExpenseMutation();

  const nameref = useRef(null);
  const amountref = useRef(null);
  const imgRef = useRef(null);

  const { user } = useSelector((state) => state.auth);

  // Function to handle form submission
  const handlingAdd = async () => {
    const formData = new FormData();
    formData.append("user", user._id);
    formData.append("income_source", nameref.current.value);
    formData.append("amount", amountref.current.value);

    // Append image file if exists
    if (imgRef.current.files.length > 0) {
      formData.append("img", imgRef.current.files[0]);
    }

    try {
      await createIncome(formData).unwrap();
      toast("Income data added successfully!");
      nameref.current.value = "";
      amountref.current.value = "";
      imgRef.current.value = "";
      refetch();
    } catch (error) {
      // toast.error("Failed to add income data.");
    }
  };

  const handlingAddExpense = async () => {
    const formData = new FormData();
    formData.append("user", user._id);
    formData.append("expense_source", nameref.current.value);
    formData.append("amount", amountref.current.value);

    // Append image file if exists
    if (imgRef.current.files.length > 0) {
      formData.append("img", imgRef.current.files[0]);
    }

    if (!(result.length === 0)) {
      if (amountref.current.value <= result) {
        try {
          await createExpense(formData).unwrap();
          toast("Expense data added successfully!");
          nameref.current.value = "";
          amountref.current.value = "";
          imgRef.current.value = "";
        } catch (error) {
          // toast.error("Failed to add expense data.");
        }
      } else {
        toast.warning(
          "Expense amount cannot be greater than the available result."
        );
      }
    } else {
      toast.warning("You Can't Add Expense Without Income");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setselectbtn(0)}
          className={`min-h-[50px] w-full rounded-lg text-white font-bold ${
            selectbtn === 0
              ? "shadow-lightmodeclick dark:shadow-buttonclick"
              : "shadow-lightmode dark:shadow-customshadow"
          }`}
        >
          Income
        </button>
        <button
          onClick={() => setselectbtn(1)}
          className={`min-h-[50px] w-full rounded-lg text-white font-bold ${
            selectbtn === 1
              ? "shadow-lightmodeclick dark:shadow-buttonclick"
              : "shadow-lightmode dark:shadow-customshadow"
          }`}
        >
          Expense
        </button>
      </div>

      <div className="w-full p-[24px] shadow-lightmode dark:shadow-customshadow mt-5 rounded-lg">
        {!selectbtn ? (
          <div className="">
            <h6>Income Source</h6>
            <input
              ref={nameref}
              onKeyDown={(e) => e.key === "Enter" && amountref.current.focus()}
              className="w-full mt-2 focus:outline-none bg-transparent shadow-lightmodeclick dark:shadow-buttonclick p-[5px_10px] rounded-md"
              type="text"
            />

            <h6 className="mt-5">Amount:</h6>
            <input
              ref={amountref}
              onKeyDown={(e) =>
                e.key === "Enter" && (handlingAdd(), nameref.current.focus())
              }
              className="w-full mt-2 focus:outline-none bg-transparent shadow-lightmodeclick dark:shadow-buttonclick p-[5px_10px] rounded-md"
              type="number"
            />

            {/* Optional image input */}
            <h6 className="mt-5">Image (optional):</h6>
            <input
              ref={imgRef}
              className="w-full mt-2 p-[5px_10px] rounded-md"
              type="file"
            />

            <button
              onClick={handlingAdd}
              className="min-h-[50px] shadow-lightmode dark:shadow-customshadow w-full px-10 mt-5 rounded-lg text-white font-bold active:shadow-lightmodeclick dark:active:shadow-buttonclick"
            >
              Add Income
            </button>
          </div>
        ) : (
          <div className="">
            <h6>Expense Source</h6>
            <input
              ref={nameref}
              onKeyDown={(e) => e.key === "Enter" && amountref.current.focus()}
              className="w-full mt-2 focus:outline-none bg-transparent shadow-lightmodeclick dark:shadow-buttonclick p-[5px_10px] rounded-md"
              type="text"
            />

            <h6 className="mt-5">Amount:</h6>
            <input
              ref={amountref}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (handlingAddExpense(), nameref.current.focus())
              }
              className="w-full mt-2 focus:outline-none bg-transparent shadow-lightmodeclick dark:shadow-buttonclick p-[5px_10px] rounded-md"
              type="number"
            />

            {/* Optional image input */}
            <h6 className="mt-5">Image (optional):</h6>
            <input
              ref={imgRef}
              className="w-full mt-2 p-[5px_10px] rounded-md"
              type="file"
            />

            <button
              onClick={handlingAddExpense}
              className="min-h-[50px] shadow-lightmode dark:shadow-customshadow w-full px-10 mt-5 rounded-lg text-white font-bold active:shadow-lightmodeclick dark:active:shadow-buttonclick"
            >
              Add Expense
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddForm;
