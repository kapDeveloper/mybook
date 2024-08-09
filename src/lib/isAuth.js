"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
export default function isAuth(Component) {
  return function IsAuth(props) {
    // const auth = false;

    const { token } = useSelector((state) => state.auth);

    // console.log(token);
    useEffect(() => {
      if (!token) {
        redirect("/login");
      }
    }, [token]);

    if (!token) {
      return null;
    }

    return <Component {...props} />;
  };
}
