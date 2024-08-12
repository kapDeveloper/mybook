"use client";

import { clearCredentials } from "@/features/authSlice";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearCredentials());

    router.push("/login");
  };
  return (
    <nav className="flex gap-5">
      {/* <Link href="/">Home</Link> */}
      <button className="font-bold" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
