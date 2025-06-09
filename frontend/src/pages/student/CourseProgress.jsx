/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useCompleteCourseMutation, useGetCourseprogressQuery, useIncompleteCourseMutation, useUpdateLectureProgressMutation } from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

function CourseProgress() {
  const params = useParams();
  const courseId = params?.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseprogressQuery(courseId);
  // const isCompleted = true;

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse,{data:markCompleteData,isSuccess:completedSuccess}] = useCompleteCourseMutation();
  const [inCompleteCourse,{data:markInCompleteData,isSuccess:inCompleteSuccess}] = useIncompleteCourseMutation();

  useEffect(()=>{
    if (completedSuccess) {
      refetch()
      toast.success("Mark as completed.")
    }
    if (inCompleteSuccess) {
      refetch()
      toast.success("Mark as Incompleted.")
    }
  },[completedSuccess,inCompleteSuccess])

  const [currentLecture, setCurrentLecture] = useState(null);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Failed to load course details...</p>;
  }

  const { courseDetails, progress, completed } = data.data;
  // console.log(courseDetails,progress,completed);

  // initialize the first lecture is not exist
  const initialLecture =
    currentLecture || (courseDetails?.lectures && courseDetails?.lectures[0]);

  const islectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleupdateLectureProgress = async(lectureId)=>{
    await updateLectureProgress({courseId,lectureId});
    refetch();

  }
  // handle select specific lecture
  const handleSelectLecture = (lecture)=>{
    setCurrentLecture(lecture)
    handleupdateLectureProgress(lecture?._id)
  }


  const handleCompleteCourse = async()=>{
    await completeCourse(courseId)
  }
  const handleIncompleteCourse = async()=>{
   await inCompleteCourse(courseId)
  }

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      {/* Display course name */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseDetails?.courseTitle}</h1>
        <Button variant={completed ? "outline":"default"} onClick={!completed ? handleCompleteCourse : handleIncompleteCourse}>{completed ? <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2"/> <span>Completed</span></div> : "Mark as completed"}</Button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Video */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture?.videoUrl}
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={()=>handleupdateLectureProgress(currentLecture?._id || initialLecture?._id)}
            />
          </div>
          {/* display current video */}

          <div className="mt-2">
            <h3 className="font-medium text-lg">{`Lecture ${
              courseDetails.lectures.findIndex(
                (lec) => lec._id === (currentLecture?._id || initialLecture._id)
              ) + 1
            } : ${
              currentLecture?.lectureTitle || initialLecture?.lectureTitle
            }`}</h3>
          </div>
        </div>
        {/* sidebar lecture */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-l border-gray-400 md:pl-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails?.lectures?.map((lecture, i) => (
              <Card
                key={lecture?._id || i}
                onClick={()=>handleSelectLecture(lecture)}
                className={`mb-3 hover:cursor-pointer transition transform ${lecture?._id === currentLecture?._id ? "bg-gray-200":"dark:bg-gray-500"}`}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {islectureCompleted(lecture?._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture?.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {islectureCompleted(lecture?._id) && (
                    <Badge className={`bg-green-200 text-green-600`}>{`Completed`}</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseProgress;













