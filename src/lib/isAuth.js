import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function isAuth(Component) {
  return function IsAuth(props) {
    const router = useRouter();
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
      if (!token) {
        router.push("/login");
      }
    }, [token, router]);

    // Optionally render a loading indicator while checking auth status
    if (!token) {
      return (
        <div className="flex min-h-screen justify-center ">Loading...</div>
      );
    }

    return <Component {...props} />;
  };
}
