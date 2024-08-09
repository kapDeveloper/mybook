import Link from "next/link";
const PageNotFound = () => {
  return (
    <div>
      <h1>PageNotFound</h1>
      <Link href="/mybook">Return To Home</Link>
    </div>
  );
};

export default PageNotFound;
