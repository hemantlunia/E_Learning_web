import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import Courses from "./Courses";
import { useLoadUserQuery } from "@/features/api/authApi";

function HeroSection() {
  const [searchValue, setSearchvalue] = useState("");
  const {refetch} = useLoadUserQuery()
  useEffect(()=>{
    refetch()
  },[])
  return (
    <>
      <div className="relative bg-gradient-to-t from-blue-400 to bg-indigo-500 dark:from-gray-800 dark:to-gray-900 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-white text-4xl font-bold mb-4">
            Find Best Courses
          </h1>
          <p className="text-gray-300 dark:text-gray-500 mb-8">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi,
            accusantium eius ipsam debitis culpa enim.
          </p>

          {/* Input form */}
          <form>
            <div className="flex">
              <Input
              value={searchValue}
              onChange={(e)=>setSearchvalue(e.target.value)}
                type="text"
                placeholder="search here..."
                className="flex-grow border-none focus-visible:ring-0 mx-auto  py-3 text-white dark:text-gray-200 rounded-full shadow-lg overflow-hidden max-w-xl mb-6"
              />
              {searchValue && (
                <Button  className="bg-blue-500 dark:bg-blue-700 text-pretty hover:bg-blue-900 text-white py-3">
                  Go
                </Button>
              )}
            </div>
            <Button className="bg-gray-100 font-semibold dark:bg-gray-800 text-blue-500 rounded-full hover:text-blue-900 hover:bg-white">
              Explore courses
            </Button>
          </form>
        </div>
      </div>
      {/* Course Component */}
      <div>
        <Courses/>
      </div>
    </>
  );
}

export default HeroSection;
