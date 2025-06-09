import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Link, useSearchParams } from "react-router";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";

function SearchPage() {
 
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const {data,isLoading} = useGetSearchCourseQuery({
    query:query,
    categories:selectedCategories,
    sortByPrice
  });

  const isEmpty = !isLoading && data?.data.length === 0;

const handleFilterChange = (categories,price)=>{
    setSelectedCategories(categories)
    setSortByPrice(price)
}
  return (
    <>
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="my-7">
          <h1 className="font-bold text-xl md:text-2xl">Result for "{query}" </h1>
          <p>
            Showing result for
            <span className="text-blue-800 font-bold italic pl-3">{query}</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-10 mt-5">
          <Filter handleFilterChange={handleFilterChange}/>
          <div className="flex-1">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, id) => (
                <CourseSkeleton key={id} />
              ))
            ) : isEmpty ? (
              <CourseNotFound />
            ) : (
              data?.data?.map((course) => <SearchResult key={course._id} course={course}/>)
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;

const CourseSkeleton = () => {
  return (
    <div className="p-6 animate-pulse space-y-4">
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
    </div>
  );
};
const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-700 transition"
      >
        All Courses
      </Link>
    </div>
  )
};
