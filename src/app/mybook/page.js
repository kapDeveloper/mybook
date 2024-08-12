"use client";
import isAuth from "@/lib/isAuth";
import React, { lazy, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TotalComponets = lazy(() => import("./compoents/TotalComponets"));
const AddForm = lazy(() => import("./compoents/AddForm"));
const AddIconFrom = lazy(() => import("./compoents/AddIconFrom"));
const CenterContainer = lazy(() => import("./compoents/CenterContainer"));

function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [CustomIcon, setCustomIcon] = useState(true);
  return (
    <div className="bg-[#ead6d6] dark:bg-[#3f2727]  w-full flex items-center">
      <div className="grid grid-cols-12 w-full px-2 sm:px-5 lg:px-20 gap-5 py-3">
        <div className="col-span-12 md:col-span-6 xl:col-span-3 min-h-[400px] p-[24px] rounded-xl">
          <button
            onClick={() => {
              setCustomIcon(!CustomIcon);
            }}
            className="min-h-[50px] shadow-lightmode active:shadow-lightmodeclick dark:shadow-customshadow w-full rounded-lg text-white font-bold dark:active:shadow-buttonclick"
          >
            {CustomIcon ? "CustomIcon" : "CustomInput"}
          </button>
          <div className="mt-5">
            {CustomIcon ? <AddForm /> : <AddIconFrom />}
          </div>
        </div>
        <div className="col-span-12 xl:col-span-6 order-2 md:order-3 xl:order-2 shadow-lightmode dark:shadow-customshadow min-h-[400px]  rounded-xl p-[24px]">
          <CenterContainer />
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-3 mt-6 xl:mt-0 order-3 md:order-2 xl:order-3 shadow-lightmode dark:shadow-customshadow h-[300px] flex flex-col p-[24px]  items-center rounded-xl">
          <TotalComponets />
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={3}
        autoClose={2000}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        className={"custom_toast"}
      />
    </div>

    // <main className="">Book</main>
  );
}

export default isAuth(page);
