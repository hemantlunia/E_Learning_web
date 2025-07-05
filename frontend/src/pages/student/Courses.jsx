import { Card, CardContent } from '@/components/ui/card';
import React from 'react'
import Course from './Course';
import { useGetPublishedCoursesQuery } from '@/features/api/courseApi';
import LoadingSpinner from '@/components/LoadingSpinner';

function Courses() {
    const {data,isLoading,isError} = useGetPublishedCoursesQuery();
    
    if (isLoading) {
      return <LoadingSpinner/>
    }
    if (isError) {
      return <h1>Something went wrong. Try Again!</h1>
    }
    
  return (
    <>
        <div className='bg-gray-100 dark:bg-gray-700'>
            <div className='max-w-7xl mx-auto p-6'>
                <h2 className='font-bold text-3xl text-center mb-10'>Our Courses</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {
                    isLoading ? Array.from({length:9}).map((_,i)=>(<CourseSkeleton key={i}/>)):(
                        data?.data?.map((course,i)=>(<Course key={course?._id || i} course={course}/>))
                    )
                }
                </div>
                
            </div>
        </div>
    </>
  )
}

export default Courses;

const CourseSkeleton = ()=>{
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
    )
}