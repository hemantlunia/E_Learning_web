import { Link } from "react-router";
import { Button } from "./ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
    <h1 className="text-6xl font-bold text-red-500">404</h1>
    <p className="mt-4 text-2xl text-gray-800">Page Not Found</p>
    <p className="mt-2 text-gray-600 text-center max-w-md">
      Sorry, the page you're looking for doesn't exist or has been moved.
    </p>

    <Link to={`/`}>
      <Button className="mt-6 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
        Go Back Home
      </Button>
    </Link>
  </div>
  );
};

export default NotFound;
