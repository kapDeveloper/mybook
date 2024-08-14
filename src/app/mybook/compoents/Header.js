"use client";
import React, { useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import ToggleDarkMode from "@/app/(auth)/darkmode/ToggleDarkMode";
import Navbar from "@/components/Navbar";
import Link from "next/link";
function Header() {
  const router = useRouter();
  const path = usePathname();

  const [btnname, setBtnname] = useState("signalIcon");
  const hadlingchanging = () => {
    path == "/mybook"
      ? (router.push("/mybook/iconCounter"), setBtnname("mybook"))
      : (path == "/mybook/iconCounter" && router.push("/mybook"),
        setBtnname("signalIcon"));
  };
  return (
    <div className="shadow-lightmode dark:shadow-customshadow px-2 z-20 bg-darkmode sm:px-28 py-4 sticky flex items-center justify-between top-0 left-0">
      <h1 className="font-bold">
        <Link href="/">MyBook</Link>
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={hadlingchanging}
          className={`min-h-[50px] px-4 w-full rounded-lg text-white font-bold shadow:lightmode active:shadow:lightmodeclick dark:shadow-customshadow dark:active:shadow-buttonclick `}
        >
          {btnname}
        </button>
        <ToggleDarkMode />

        <Navbar />
      </div>
    </div>
  );
}

export default Header;
