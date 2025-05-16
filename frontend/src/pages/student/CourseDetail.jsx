import BuyCourseButton from "@/components/BuyCourseButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, LockKeyhole, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router";

function CourseDetail() {
  const navigate = useNavigate();
  const free = true;
  // const purchaseCourse = true;
  const params = useParams();
  const courseId = params.courseId;

  const {data,isLoading,isError} = useGetCourseDetailWithStatusQuery(courseId);
  // const {status,data:courseData} = data;
  console.log("CourseDetailData",data);

  const handleContinueCourse = ()=>{
        if (data?.status) {
          navigate(`/course-progress/${courseId}`)
        }
  }
  

  if (isLoading) {
    return <>
    <h1>Loading...</h1>
    <LoadingSpinner/>
    </>
  }
  if (isError) {
    return <h1>Failed to load course details.</h1>
  }
  return (
    <div className="mt-16 space-y-5">
      <div className="bg-slate-400 text-white">
        <div className="max-w-7xl mx-auto py-5 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{data?.data?.courseTitle || "Failed To Load Course-Title"}</h1>
          <p className="text-base md:text-lg">{data?.data?.subTitle || "Failed to load Sub-Title"}</p>
          <p>
            Created by{" "}
            <span className="text-neutral-900 underline italic">{data?.data?.creator?.name || "Course Creator Name"}</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Created : {data?.data?.createdAt.slice(0,10)}</p>
          </div>
            <p>Last updated : {data?.data?.updatedAt.slice(0,10)}</p>
          <p>Student enrolled : {data?.data?.enrolledStudent?.length}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm" dangerouslySetInnerHTML={{__html:data?.data?.description}}/>
          <Card>
            <CardHeader>
              <CardTitle>{data?.data?.courseTitle || "Failed To Load Course-Title"}</CardTitle>
              <CardDescription>{data?.data?.lectures?.length} lecture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {data?.data?.lectures?.map((lecture, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span>
                    {free ? (
                      <PlayCircle size={14} />
                    ) : (
                      <LockKeyhole size={14} />
                    )}
                  </span>
                  <p>{lecture?.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer 
                width={`100%`}
                height={`100%`}
                url={data?.data?.lectures[0].videoUrl}
                controls={true}
                />
              </div>
              <h2>Lecture title</h2>
              <h2 className="text-lg md:text-xl font-semibold">Course price</h2>

              <Separator className="my-2" />
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {data?.status ? (
                <Button className="w-full" onClick={handleContinueCourse}>Continue Course</Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
