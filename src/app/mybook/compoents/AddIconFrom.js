"use client";
import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addIncome,
  addExpanse,
  deletecustomIconincome,
  deletecustomIconexpnse,
} from "../../store/features/counter";
import { toast } from "react-toastify";

const Tooltip = lazy(() => import("./Tooltip"));
const CenterModel = lazy(() => import("./models/CenterModel"));

function AddIconFrom() {
  //   const incomeIcons = useSelector((state) => state.items?.customIcon?.income);
  //   const expanseIcons = useSelector((state) => state.items?.customIcon?.expanse);
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [selectbtn, setselectbtn] = useState(0);
  //   const [showdata, setShowdata] = useState(incomeIcons);
  const [modeltype, setModeltype] = useState();
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     selectbtn == 0 ? setShowdata(incomeIcons) : setShowdata(expanseIcons);
  //   }, [selectbtn, incomeIcons, expanseIcons]);

  //   const handlingadditem = (item) => {
  //     let data = {
  //       id: parseFloat(Math.random()),
  //       icon: item.icon,
  //       name: item.name,
  //       amount: item.amount,
  //       time: "",
  //     };
  //     selectbtn == 0
  //       ? (dispatch(addIncome(data)), toast("Add income icon data!"))
  //       : (dispatch(addExpanse(data)), toast("Add expanse icon data!"));
  //   };

  //   const testfn = (id) => {
  //     selectbtn == 0
  //       ? (dispatch(deletecustomIconincome(id)), toast("Edit income icon data!"))
  //       : (dispatch(deletecustomIconexpnse(id)),
  //         toast("Edit expanse icon data!"));
  //   };

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
            setIsOpenModel(true), setModeltype("add");
          }}
          className="w-24 grid place-content-center text-3xl hover:bg-[#91565663] rounded-full  h-24 border-dashed border-2"
        >
          +
        </div>
        {/* {showdata?.map((item) => {
                    return (
                        // eslint-disable-next-line react/jsx-key
                        <Tooltip text={'remove'} fn={() => testfn(item.id)}>
                            <div onClick={() => handlingadditem(item)}>
                                <div className='w-24  text-3xl hover:bg-gray-200 dark:hover:bg-[#91565663] rounded-full  h-24 border-dashed border-2 p-2'>
                                    <img className='w-full h-full  rounded-full' src={item.icon ? item.icon : "/assets/images/shirt.png"} alt="" />
                                </div>
                                <p className='pl-3 text-sm'>Icon Name</p>
                            </div>
                        </Tooltip>
                    )
                })} */}
      </div>
      {/* <CenterModel
        isOpenModel={isOpenModel}
        setIsOpenModel={setIsOpenModel}
        selectbtn={selectbtn}
        modeltype={modeltype}
      /> */}
    </>
  );
}

export default AddIconFrom;
