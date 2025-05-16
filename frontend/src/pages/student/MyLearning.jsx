import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Course from "./Course";

function MyLearning() {
  let isLoading = false;
  let mylearningcourses = [];
  return (
    <>
      <div className="max-w-4xl mx-auto my-24 px-4 md:px-1">
        <h1 className="font-bold text-2xl">My Learning</h1>
        <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            // <MyLearningSkeleton />
            mylearningcourses.map((_,i)=>(<MyLearningSkeleton key={i}/>))
          ) : mylearningcourses.length === 0 ? (
            <p>You are not enrolled yet any courses.</p>
          ) : (
            
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {  mylearningcourses.map((course, i) => <Course key={i} course={course}/>)}
          </div>
          )}
        </div>
      </div>
    </>
  );
}
export default MyLearning;

// Learning skeleton
const MyLearningSkeleton = () => {
  return (
    <Card className="w-full max-w-sm animate-pulse rounded-xl shadow-md">
      <div className="h-48 bg-gray-300 rounded-t-xl" />
      <CardContent className="space-y-4 p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-10 bg-gray-300 rounded w-1/2 mt-4" />
      </CardContent>
    </Card>
  );
};
