"use client";
import {
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
} from "@/services/expenseApi";
import {
  useCreateIncomeMutation,
  useUpdateIncomeMutation,
} from "@/services/incomeApi";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function CenterModel({
  isOpenModel,
  setIsOpenModel,
  modeltype,
  selctEditId,
  selectbtn,
  selectedItem,
  addIconFormFlag,
}) {
  // console.log("addIconFormFlag", addIconFormFlag);
  const { user } = useSelector((state) => state.auth);

  const fileref = useRef(null);

  const [formState, setFormState] = useState({
    source: "",
    amount: "",
    img: null,
  });

  // create addiconform
  const [createIncome] = useCreateIncomeMutation();
  const [createExpense] = useCreateExpenseMutation();

  // update
  const [updateExpense] = useUpdateExpenseMutation();
  const [updateIncome] = useUpdateIncomeMutation();

  useEffect(() => {
    if (isOpenModel && selectedItem) {
      setFormState({
        source:
          selectbtn === 0
            ? selectedItem.income_source || ""
            : selectedItem.expense_source || "",
        amount: selectedItem.amount || "",
        img: selectedItem.img || null,
      });
    }
  }, [isOpenModel, selectedItem, selectbtn]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      img: e.target.files[0],
    }));
  };

  function closeModal() {
    setIsOpenModel(false);
  }

  const clearfn = () => {
    setFormState({
      source: "",
      amount: "",
      img: null,
    });
    closeModal();
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("id", selctEditId);
    formData.append(
      selectbtn === 0 ? "income_source" : "expense_source",
      formState.source
    );
    formData.append("amount", formState.amount);

    if (formState.img) {
      formData.append("img", formState.img);
    }

    try {
      if (modeltype === "edit" && selctEditId) {
        if (selectbtn === 0) {
          await updateIncome({ id: selctEditId, formData }).unwrap();
          toast.success("Income updated successfully!");
        } else {
          await updateExpense({ id: selctEditId, formData }).unwrap();
          toast.success("Expense updated successfully!");
        }
      } else {
        toast.error(
          `Failed to update ${selectbtn === 0 ? "income" : "expense"} data.`
        );
      }
      clearfn();
    } catch (error) {
      console.error("Failed to Update the item:", error);
      toast.error("Failed to Update the item.");
    }
  };

  const handleSubmitAddIcon = async () => {
    const formData = new FormData();
    formData.append("user", user._id);
    formData.append(
      selectbtn === 0 ? "income_source" : "expense_source",
      formState.source
    );
    formData.append("amount", formState.amount);

    if (formState.img) {
      formData.append("img", formState.img);
    }

    try {
      if (addIconFormFlag === true) {
        if (selectbtn === 0) {
          await createIncome(formData).unwrap();
          toast.success("Income Created successfully!");
        } else {
          await createExpense(formData).unwrap();
          toast.success("Expense Created successfully!");
        }
      } else {
        toast.error(
          `Failed to Created ${selectbtn === 0 ? "income" : "expense"} data.`
        );
      }
      clearfn();
    } catch (error) {
      console.error("Failed to Creating the item:", error);
      toast.error("Failed to Creating the item.");
    }
  };

  return (
    <Transition appear show={isOpenModel} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/12" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-lightmode dark:bg-darkmode shadow-lightmode dark:shadow-customshadow sm:p-6 text-left align-middle text-white transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-500"
                >
                  {modeltype === "edit"
                    ? "Edit Item"
                    : modeltype === "add"
                    ? "Add New Item"
                    : ""}
                </Dialog.Title>
                <div className="mt-2 flex justify-end">
                  <div className="w-24 text-3xl hover:bg-gray-200 dark:hover:bg-[#91565663] rounded-full h-24 border-2 p-1">
                    <Image
                      onClick={() => fileref.current.click()}
                      className="w-full h-full rounded-full"
                      src={
                        formState.img instanceof File
                          ? URL.createObjectURL(formState.img)
                          : selectedItem?.img
                      }
                      alt="Uploaded image"
                      width={96}
                      height={96}
                    />

                    <input
                      onChange={handleFileChange}
                      type="file"
                      className="hidden"
                      ref={fileref}
                    />
                  </div>
                </div>
                <div className="w-full p-[24px] shadow-lightmode dark:shadow-customshadow mt-5 rounded-lg">
                  <h6>
                    {selectbtn === 0 ? "Income Source:" : "Expense Source:"}
                  </h6>
                  <input
                    name="source"
                    value={formState.source}
                    onChange={handleInputChange}
                    className="w-full mt-2 focus:outline-none bg-transparent shadow-lightmodeclick dark:shadow-buttonclick p-[5px_10px] rounded-md"
                    type="text"
                  />

                  <h6 className="mt-5">Amount:</h6>
                  <input
                    name="amount"
                    value={formState.amount}
                    onChange={handleInputChange}
                    className="w-full mt-2 focus:outline-none bg-transparent shadow-lightmodeclick dark:shadow-buttonclick p-[5px_10px] rounded-md"
                    type="number"
                  />
                  <div className="flex gap-5 flex-wrap sm:flex-nowrap">
                    <button
                      onClick={closeModal}
                      className="min-h-[50px] shadow-lightmode dark:shadow-customshadow w-full px-10 mt-5 rounded-lg text-white font-bold active:shadow-lightmodeclick dark:active:shadow-buttonclick"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitAddIcon}
                      className="min-h-[50px] shadow-lightmode dark:shadow-customshadow w-full px-10 mt-5 rounded-lg text-white font-bold active:shadow-lightmodeclick dark:active:shadow-buttonclick"
                    >
                      {modeltype === "edit" ? "Save" : "Add"}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
