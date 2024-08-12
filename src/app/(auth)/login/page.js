"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLoginMutation } from "@/services/api";
import { setCredentials } from "@/features/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

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
      const data = await login({
        action: "login",
        email: formState.emailOrUsername,
        password: formState.password,
      }).unwrap(); // Throws error if response is not as expected

      // Log and check data
      // console.log("Login response data:", data);

      // Dispatch setCredentials with the correct payload
      if (data.user && data.token) {
        dispatch(setCredentials({ user: data.user, token: data.token }));
        toast.success("Login successful");
        router.push("/mybook");
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error during API request:", error);
      toast.error("Login failed: " + (error.message || "Something went wrong"));
    }
  };

  return (
    <div className="bg-[#ead6d6] dark:bg-[#3f2727] min-h-[100vh] flex justify-center pt-5 sm:pt-0 sm:items-center">
      <div className="w-full mx-3 sm:w-[500px] p-[24px] customshadow dark:shadow-customshadow mt-5 rounded-lg sm:mx-auto">
        <form onSubmit={handleSubmit}>
          <h6>Email:</h6>
          <input
            type="email"
            name="emailOrUsername"
            value={formState.emailOrUsername}
            onChange={handleChange}
            required
            placeholder="Enter email"
            className="w-full mt-2 focus:outline-none bg-transparent shadow-lightmodeclick dark:shadow-buttonclick p-[5px_10px] rounded-md"
          />
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
          <button
            type="submit"
            className="min-h-[50px] shadow-customshadow dark:shadow-customshadow w-full px-10 mt-5 rounded-lg text-white font-bold active:shadow-lightmodeclick dark:active:shadow-buttonclick"
            disabled={isLoggingIn}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
