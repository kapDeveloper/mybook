import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useUpdateIncomeMutation } from "@/services/incomeApi";

import { useUpdateExpenseMutation } from "@/services/expenseApi";
export default function CenterModel({
  isOpenModel,
  setIsOpenModel,
  modeltype,
  selctEditId,
  selectbtn,
}) {
  // expense
  console.log({ selectbtn });
  //

  const [img, setImg] = useState(null);
  const fileref = useRef(null);
  const nameref = useRef(null);
  const amountref = useRef(null);

  //
  const [updateExpense] = useUpdateExpenseMutation();

  // Initialize mutations
  const [updateIncome] = useUpdateIncomeMutation();

  // Function to close modal
  function closeModal() {
    setIsOpenModel(false);
  }

  // Clear form function
  const clearfn = () => {
    nameref.current.value = "";
    amountref.current.value = "";
    setImg(null);
    closeModal();
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // Create a new FormData object
    const formData = new FormData();
    formData.append("id", selctEditId);
    formData.append("income_source", nameref.current.value);
    formData.append("amount", amountref.current.value);

    if (img) {
      formData.append("img", img);
    }

    try {
      if (modeltype === "edit" && selctEditId) {
        await updateIncome({ id: selctEditId, formData }).unwrap();
        toast.success("Item updated successfully!");
      } else {
        toast.error("Failed to update income data.");
      }
      clearfn(); // Clear the form after submission
    } catch (error) {
      console.error("Failed to update the item:", error);
      toast.error("Failed to update the item.");
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
                        img
                          ? URL.createObjectURL(img)
                          : "/assets/images/shirt.png"
                      }
                      alt="Uploaded image"
                      width={96}
                      height={96}
                    />
                    <input
                      onChange={(e) => setImg(e.target.files[0])}
                      type="file"
                      className="hidden"
                      ref={fileref}
                    />
                  </div>
                </div>
                <div className="w-full p-[24px] shadow-lightmode dark:shadow-customshadow mt-5 rounded-lg">
                  <h6>Item Name:</h6>
                  <input
                    ref={nameref}
                    onKeyDown={(e) =>
                      e.key === "Enter" && amountref.current.focus()
                    }
                    className="w-full mt-2 focus:outline-none bg-transparent shadow-lightmodeclick dark:shadow-buttonclick p-[5px_10px] rounded-md"
                    type="text"
                  />

                  <h6 className="mt-5">Amount:</h6>
                  <input
                    ref={amountref}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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
                      onClick={handleSubmit}
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
