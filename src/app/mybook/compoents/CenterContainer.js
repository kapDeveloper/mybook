"use client";
import React, { useEffect, useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import Tooltip from "./Tooltip";
import CenterModel from "./models/CenterModel";
import TabButton from "./TabButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteIncome, deleteExpanse } from "../../store/features/counter";
import { toast } from "react-toastify";

function CenterContainer() {
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [selectbtn, setselectbtn] = useState(0);
  const dispach = useDispatch();

  const [modeltype, setModeltype] = useState();

  const [selctEditId, setSelctEditId] = useState();

  const testfn = (id) => {
    setIsOpenModel(true);
    setModeltype("edit");
    setSelctEditId(id);
  };

  const rendomColor = ["red", "green", "blue", "#c3c388"];

  // const removeItem = (id) => {
  //   selectbtn == 0
  //     ? (dispach(deleteIncome(id)), toast("Delete income icon data!"))
  //     : (dispach(deleteExpanse(id)), toast("Delete expanse icon data!"));
  // };

  // const incomeData = useSelector((state) => state?.items?.income);
  // const expanseData = useSelector((state) => state?.items?.expanse);

  // const [shawdata, setShawdata] = useState();
  // useEffect(() => {
  //   selectbtn == 0 ? setShawdata(incomeData) : setShawdata(expanseData);
  // }, [selectbtn, incomeData, expanseData]);

  return (
    <>
      <TabButton selectbtn={selectbtn} setselectbtn={setselectbtn} />
      <div className="flex flex-col gap-3 mt-5 h-[500px] overflow-auto">
        {/* {shawdata?.map((item, index) => {
          const backgroundColor = rendomColor[index % rendomColor.length];
          return (
            <>
              <Tooltip
                text={"Edit"}
                rt={true}
                fn={() => testfn(item.id)}
                tp={"-10px"}
              >
                <div className="rounded-md p-2 shadow-lightmodeclick dark:shadow-buttonclick flex items-center justify-between z-10">
                  <div className="flex items-center gap-4 sm:gap-10">
                    {item.icon ? (
                      <img
                        src={item.icon}
                        style={{ backgroundColor }}
                        className="w-12 p-0 h-12  rounded-full"
                      />
                    ) : (
                      <p
                        className="w-12 p-1 h-12  rounded-full grid place-content-center font-bold text-2xl capitalize"
                        style={{ backgroundColor }}
                      >
                        {item.name.charAt(0)}
                      </p>
                    )}

                    <p className="text-lg text-white text-ellipsis line-clamp-1 w-[150px] overflow-hidden sm:w-[250px]">
                      {item.name}
                    </p>
                    <p className="text-green-500">${item?.amount}</p>
                  </div>
                  <RiCloseLargeFill
                    onClick={() => removeItem(item.id)}
                    className="text-[26px] min-w-[20px]  text-white active:scale-90"
                  />
                </div>
              </Tooltip>
            </>
          );
        })} */}
      </div>

      {/* <CenterModel
        isOpenModel={isOpenModel}
        setIsOpenModel={setIsOpenModel}
        modeltype={modeltype}
        selctEditId={selctEditId}
        selectbtn={selectbtn}
      /> */}
    </>
  );
}

export default CenterContainer;
