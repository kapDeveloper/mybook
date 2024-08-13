"use client";
import LoginPage from "./(auth)/login/page";
import { useSelector } from "react-redux";

import Link from "next/link";
export default function Home() {
  const { token } = useSelector((state) => state.auth);

  return (
    <main>
      {!token ? (
        <LoginPage />
      ) : (
        <Link
          href="/mybook"
          className="bg-[#ead6d6] dark:bg-[#3f2727] min-h-[100vh] flex justify-center pt-5 sm:pt-0 sm:items-center text-4xl"
        >
          MYBook
        </Link>
      )}
    </main>
  );
}
