/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function AddCourse() {
  const navigate = useNavigate();
  const [courseTitle,setCourseTitle] = useState("");
  const [category,setcategory] = useState("")
  const [createCourse,{data,isLoading,error,isSuccess}] = useCreateCourseMutation();

  const getSelectedCategory = (value)=>{
    setcategory(value);
  }

  const createCourseHandler = async()=>{
      await createCourse({courseTitle,category})
  };
  useEffect(()=>{
    if(isSuccess){
      toast.success("Course created");
      navigate("/admin/course")
    }
    if (error) {
      toast.error("try again!")
    }
  },[isSuccess,error])
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
          <Input value={courseTitle} onChange={(e)=>setCourseTitle(e.target.value)} type="text" name="courseTitle" placeholder="Course name..." />
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Java">Java</SelectItem>
                <SelectItem value="Html5">Html5</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Frontend dev">Frontend Dev</SelectItem>
                <SelectItem value="Backend dev">Backend Dev</SelectItem>
                <SelectItem value="JavScript">Js</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate("/admin/course")} variant="outline">
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>{
            isLoading ?(
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              Please wait!
              </>
            ):("Create")
            }</Button>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
