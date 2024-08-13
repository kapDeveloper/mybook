import React, { useRef, useState } from "react";
import { useCreateIncomeMutation } from "@/services/incomeApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

///

function AddForm() {
  const [selectbtn, setselectbtn] = useState(0);
  const [createIncome] = useCreateIncomeMutation();

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
    } catch (error) {
      toast.error("Failed to add income data.");
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
        <h6>{!selectbtn ? "Income Source:" : "Expense Source:"}</h6>
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
          Add
        </button>
      </div>
    </div>
  );
}

export default AddForm;
