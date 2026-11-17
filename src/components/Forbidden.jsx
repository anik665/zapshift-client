import { Link } from "react-router";
import { FaLock } from "react-icons/fa6";

const Forbidden = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-4 p-6">
      <div className="flex items-center justify-center w-28 h-28 rounded-full bg-error/10">
        <FaLock className="text-6xl text-error" />
      </div>
      <h1 className="text-4xl font-bold">403 - Forbidden</h1>
      <p className="text-base-content/70 max-w-md">
        You don't have permission to access this page. Only admins can view it.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
};

export default Forbidden;
