import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Image from "next/image";
import {
  useUpdateIncomeMutation,
  useCreateIncomeMutation,
} from "@/services/incomeApi";

export default function CenterModel({
  isOpenModel,
  setIsOpenModel,
  title,
  modeltype,
  selctEditId,
  selectbtn,
}) {
  const [img, setImg] = useState(null);
  const fileref = useRef(null);
  const nameref = useRef(null);
  const amountref = useRef(null);
  const dispatch = useDispatch();

  // Initialize mutations
  const [updateIncome] = useUpdateIncomeMutation();
  const [createIncome] = useCreateIncomeMutation();

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

  // const { user } = useSelector((state) => state.auth);

  // Submit function
  const handliingSubmit = async () => {
    if (!nameref.current.value || !amountref.current.value) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const data = {
      income_source: nameref.current.value,
      amount: parseFloat(amountref.current.value),
    };

    const formData = new FormData();
    if (img) {
      formData.append("img", img);
    }
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      if (modeltype === "edit") {
        await updateIncome({ id: selctEditId, formData }).unwrap();
        toast.success("Income data updated successfully!");
      } else if (modeltype === "add") {
        await createIncome(formData).unwrap();
        toast.success("Income data added successfully!");
      } else if (modeltype === "singleicon") {
        data.qly = 1;
        dispatch(addsingleIcon(data)); // Ensure addsingleIcon is defined
        toast.success("Single income data added successfully!");
      }
      clearfn();
    } catch (error) {
      toast.error("An error occurred while processing your request.");
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
                    onKeyDown={(e) => e.key === "Enter" && handliingSubmit()}
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
                      onClick={handliingSubmit}
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
