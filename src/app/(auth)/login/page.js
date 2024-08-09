"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLoginMutation, useForgotPasswordMutation } from "@/services/api";
import { setCredentials } from "@/features/authSlice";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [action, setAction] = useState("login");

  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [forgotPassword, { isLoading: isSendingResetLink }] =
    useForgotPasswordMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const body = JSON.stringify({
        action,
        email: formState.emailOrUsername,
        password: formState.password,
      });

      response = await fetch("/api/auth", {
        method: "POST",
        headers: headers,
        body: body,
      });

      const data = await response.json();
      console.log("Response from API:", data);

      if (response.ok) {
        // Assuming `data` contains user and token
        dispatch(
          setCredentials({
            user: data.user,
            token: data.token,
          })
        );

        toast.success(
          action === "login"
            ? "Login successful"
            : "Password reset link sent to your email"
        );

        router.push("/mybook");
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error during API request:", error);
      toast.error(
        "Action failed: " + (error.message || "Something went wrong")
      );
    }
  };

  return (
    <div className="bg-[#ead6d6] dark:bg-[#3f2727] min-h-[100vh] flex justify-center pt-5 sm:pt-0 sm:items-center">
      <div className="w-full mx-3 sm:w-[500px] p-[24px] customshadow dark:shadow-customshadow mt-5 rounded-lg sm:mx-auto">
        <form onSubmit={handleSubmit}>
          <h6>{action === "login" ? "Email:" : "Username:"}</h6>
          <input
            type="email"
            name="emailOrUsername"
            value={formState.emailOrUsername}
            onChange={handleChange}
            required
            placeholder={action === "login" ? "Enter email" : "Enter username"}
            className="w-full mt-2 focus:outline-none bg-transparent shadow-lightmodeclick dark:shadow-buttonclick p-[5px_10px] rounded-md"
          />
          {action === "login" && (
            <>
              <h6 className="mt-5">Password:</h6>
              <input
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
                className="w-full mt-2 focus:outline-none bg-transparent shadow-lightmodeclick dark:shadow-buttonclick p-[5px_10px] rounded-md"
              />
            </>
          )}
          <p
            className="mt-2 text-end text-red-400 cursor-pointer"
            onClick={() =>
              setAction((prev) =>
                prev === "login" ? "forgot-password" : "login"
              )
            }
          >
            {action === "login" ? "Forgot password?" : "Back to login"}
          </p>
          <button
            type="submit"
            className="min-h-[50px] shadow-customshadow dark:shadow-customshadow w-full px-10 mt-5 rounded-lg text-white font-bold active:shadow-lightmodeclick dark:active:shadow-buttonclick"
            disabled={isLoggingIn || isSendingResetLink}
          >
            {action === "login" ? "Login" : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
