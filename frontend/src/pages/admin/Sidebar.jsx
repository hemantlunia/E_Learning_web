import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router";

function Sidebar() {
  return (
    <>
     <div className="flex">
     <div className="hidden mt-16 lg:block w-[250px] sm:w-[300] space-y-8 border-gray-300 dark:border-gray-700 bg-[#f0f0f0] dark:bg-gray-600 p-5 h-screen sticky top-0">
        <div className="space-y-4">
          <Link to={`/admin`} className="flex items-center gap-2">
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link to={`/admin/course`} className="flex items-center gap-2">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
      <div className="mt-16 p-2 bg-white flex-1 dark:bg-gray-600">
        <Outlet/>
      </div>
     </div>
    </>
  );
}

export default Sidebar;
