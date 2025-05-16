import { Button } from "@/components/ui/button";
import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import CourseTab from "./CourseTab";

function EditCourse() {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">Add detail Regarding Course</h1>
        <Link>
          <Button onClick={()=>navigate(`/admin/course/${courseId}/lecture`)} className="hover:bg-green-400">Go to lectures page</Button>
        </Link>
      </div>
      <CourseTab/>
    </div>
  );
}

export default EditCourse;
