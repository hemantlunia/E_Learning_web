import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { LucideFolderEdit } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function CourseTable() {
  const { data, isLoading } = useGetCreatorCourseQuery();
  useEffect(()=>{

  },[])
  
  const navigate = useNavigate();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  const fetchedCourses = data?.data;
  
  return (
    <div>
      <Button onClick={() => navigate("/admin/course/create")}>
        Create A new Course
      </Button>
      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetchedCourses?.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">{course?.coursePrice || "NA"}</TableCell>
              <TableCell>{course?.isPublished ? "Published":"Draft"}</TableCell>
              <TableCell>{course?.courseTitle}</TableCell>
              <TableCell className="text-right">
                <Button onClick={()=>navigate(`/admin/course/${course?._id}`)} size="sm" variant ="ghost"><LucideFolderEdit/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CourseTable;
