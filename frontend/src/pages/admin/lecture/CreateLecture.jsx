import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import Lecture from "./Lecture";

function CreateLecture() {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const [lectureTitle, setlectureTitle] = useState("");
  const [createLecture, { isLoading, error, isSuccess }] =
    useCreateLectureMutation();

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch
  } = useGetLectureQuery(courseId);

  useEffect(() => {
    if (isSuccess) {
      refetch()
      toast.success("Lecture created");
    }
    if (error) {
      toast.error("Try again,failed to create lecture");
    }
  }, [isSuccess, error]);

  // console.log("lecture Data ",lectureData);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Add Course Details here...</h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          expedita.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setlectureTitle(e.target.value)}
            type="text"
            name="courseTitle"
            placeholder="lecture name..."
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate(`/admin/course/${courseId}`)}
            variant="outline"
          >
            Back to course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait!
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
        {/* lecture display */}
        <div className="mt-10">
          {lectureLoading ? (
            <p>Loading lecture...</p>
          ) : lectureError ? (
            <p>Failed to load lectures</p>
          ) : lectureData.length === 0 ? (
            <p>No lecture Available</p>
          ) : (
            lectureData?.data?.map((lecture,index)=>(
              <Lecture key={lecture?._id} lecture={lecture} index={index} courseId={courseId}/>
            ))
            
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateLecture;
