import React, { lazy } from "react";
import { ToastContainer, toast } from "react-toastify";

const Header = lazy(() => import("./compoents/Header"));

function layout({ children }) {
  return (
    <div className="bg-[#ead6d6] dark:bg-[#3f2727] min-h-[calc(100vh)]">
      <Header />
      <div className="mt-20">{children}</div>

      <ToastContainer />
    </div>
  );
}

export default layout;
