import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addcustomIconincome,
  addcustomIconexpnse,
  updateIncome,
  updateExpanse,
  addsingleIcon,
} from "../../../store/features/counter";
import { toast } from "react-toastify";
import Image from "next/image";

export default function CenterModel({
  isOpenModel,
  setIsOpenModel,
  title,
  modeltype,
  selctEditId,
  selectbtn,
}) {
  const [img, setImg] = useState();
  const fileref = useRef(null);
  const nameref = useRef(null);
  const amountref = useRef(null);
  const dispatch = useDispatch();

  // Fetch data from the Redux store
  // const incomeData = useSelector((state) => state.items.income);
  // const expanseData = useSelector((state) => state.items.expanse);

  // Function to close modal
  function closeModal() {
    setIsOpenModel(false);
  }

  // Fetch and set data if editing
  // useEffect(() => {
  //   if (isOpenModel && modeltype === "edit") {
  //     const data =
  //       selectbtn === 0
  //         ? incomeData.find((item) => item.id === selctEditId)
  //         : expanseData.find((item) => item.id === selctEditId);
  //     if (data) {
  //       if (nameref.current) nameref.current.value = data.name || "";
  //       if (amountref.current) amountref.current.value = data.amount || "";
  //       setImg(data.img || null);
  //     }
  //   }
  // }, [selctEditId, selectbtn, incomeData, expanseData, isOpenModel, modeltype]);

  // Clear form function
  const clearfn = () => {
    nameref.current.value = "";
    amountref.current.value = "";
    setImg("");
    closeModal();
  };

  // Submit function
  const handliingSubmit = () => {
    if (!nameref.current.value || !amountref.current.value) {
      closeModal();
      return;
    }

    const data = {
      id: modeltype === "edit" ? selctEditId : Math.random(),
      icon: img,
      name: nameref.current.value,
      amount: parseFloat(amountref.current.value),
      time: "",
    };

    if (modeltype === "edit") {
      if (selectbtn === 0) {
        dispatch(updateIncome({ id: selctEditId, updatedData: data }));
        toast("Edit income data!");
      } else {
        dispatch(updateExpanse({ id: selctEditId, updatedData: data }));
        toast("Edit expense data!");
      }
    } else if (modeltype === "add") {
      if (selectbtn === 0) {
        dispatch(addcustomIconincome(data));
        toast("Add income data!");
      } else {
        dispatch(addcustomIconexpnse(data));
        toast("Add expense data!");
      }
    } else if (modeltype === "singleicon") {
      data.qly = 1;
      dispatch(addsingleIcon(data));
      toast("Add single income data!");
    }

    clearfn();
  };

  return (
    <>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-lightmode dark:bg-darkmode  shadow-lightmode dark:shadow-customshadow sm:p-6 text-left align-middle text-white transition-all">
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
                        src={img ? img : "/assets/images/shirt.png"}
                        alt=""
                      />
                      <input
                        onChange={(e) =>
                          setImg(URL.createObjectURL(e.target.files[0]))
                        }
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
    </>
  );
}
