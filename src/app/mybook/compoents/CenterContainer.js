"use client";
import React, { useEffect, useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import Tooltip from "./Tooltip";
import CenterModel from "./models/CenterModel";
import TabButton from "./TabButton";
import { useDispatch } from "react-redux";
import { deleteIncome, deleteExpanse } from "../../store/features/counter";
import { toast } from "react-toastify";

import { useGetIncomesQuery } from "@/services/incomeApi";
import Image from "next/image";

function CenterContainer() {
  const { data, error, isLoading } = useGetIncomesQuery();

  console.log({ data });
  if (isLoading) {
    console.log("Loading data...");
  }

  if (error) {
    console.error("Error fetching data:", error);
  }

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

  const removeItem = (id) => {
    selectbtn == 0
      ? (dispach(deleteIncome(id)), toast("Deleted income item!"))
      : (dispach(deleteExpanse(id)), toast("Deleted expense item!"));
  };

  const [shawdata, setShawdata] = useState([]);

  useEffect(() => {
    if (data) {
      setShawdata(selectbtn === 0 ? data.income : data.expanse);
    }
  }, [selectbtn, data]);

  return (
    <>
      <TabButton selectbtn={selectbtn} setselectbtn={setselectbtn} />
      <div className="flex flex-col gap-3 mt-5 h-[500px] overflow-auto">
        {data?.map((item, index) => {
          const backgroundColor = rendomColor[index % rendomColor.length];
          return (
            <Tooltip
              text={"Edit"}
              rt={true}
              fn={() => testfn(item._id)}
              tp={"-10px"}
              key={item._id}
            >
              <div className="rounded-md p-2 shadow-lightmodeclick dark:shadow-buttonclick flex items-center justify-between z-10">
                <div className="flex items-center gap-4 sm:gap-10">
                  {item.img ? (
                    <Image
                      src={item.img}
                      style={{ backgroundColor }}
                      className="w-12 p-0 h-12 rounded-full"
                      alt=""
                    />
                  ) : (
                    <p
                      className="w-12 p-1 h-12 rounded-full grid place-content-center font-bold text-2xl capitalize"
                      style={{ backgroundColor }}
                    >
                      {item.income_source.charAt(0)}
                    </p>
                  )}

                  <p className="text-lg text-white text-ellipsis line-clamp-1 w-[150px] overflow-hidden sm:w-[250px]">
                    {item.income_source}
                  </p>
                  <p className="text-green-500">${item?.amount}</p>
                </div>
                <RiCloseLargeFill
                  onClick={() => removeItem(item._id)}
                  className="text-[26px] min-w-[20px] text-white active:scale-90"
                />
              </div>
            </Tooltip>
          );
        })}
      </div>

      <CenterModel
        isOpenModel={isOpenModel}
        setIsOpenModel={setIsOpenModel}
        modeltype={modeltype}
        selctEditId={selctEditId}
        selectbtn={selectbtn}
      />
    </>
  );
}

export default CenterContainer;
