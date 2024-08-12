import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addIncome, addExpanse } from "../../store/features/counter";
import { toast } from "react-toastify";
function AddForm() {
  const [selectbtn, setselectbtn] = useState(0);
  const dispatch = useDispatch();
  const nameref = useRef(null);
  const amountref = useRef(null);
  // fn

  const handlingAdd = () => {
    let data = {
      id: parseFloat(Math.random()),
      icon: "",
      name: nameref.current.value,
      amount: amountref.current.value,
      time: "",
    };

    selectbtn == 0
      ? (dispatch(addIncome(data)), toast("Add income data!"))
      : (dispatch(addExpanse(data)), toast("Add expanse data!"));

    nameref.current.value = "";
    amountref.current.value = "";
  };

  return (
    <div>
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

      <div className="w-full p-[24px] shadow-lightmode  dark:shadow-customshadow mt-5 rounded-lg">
        {!selectbtn ? (
          <h6>Income Name:</h6>
        ) : (
          <h6 className="">Expense Name:</h6>
        )}
        <input
          ref={nameref}
          onKeyDown={(e) => e.key == "Enter" && amountref.current.focus()}
          className="w-full mt-2 focus:outline-none bg-transparent shadow-lightmodeclick dark:shadow-buttonclick p-[5px_10px] rounded-md"
          type="text"
        />

        <h6 className="mt-5">Amount:</h6>
        <input
          ref={amountref}
          onKeyDown={(e) =>
            e.key == "Enter" && (handlingAdd(), nameref.current.focus())
          }
          className="w-full mt-2 focus:outline-none bg-transparent shadow-lightmodeclick dark:shadow-buttonclick p-[5px_10px] rounded-md"
          type="number"
        />
        <button
          onChange={handlingAdd}
          className="min-h-[50px] shadow-lightmode  dark:shadow-customshadow w-full px-10 mt-5 rounded-lg text-white font-bold active:shadow-lightmodeclick  dark:active:shadow-buttonclick"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddForm;
