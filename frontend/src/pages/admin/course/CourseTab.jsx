import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

function CourseTab() {
  const params = useParams();
  const courseId = params.courseId;
  const { data: courseByIdData, isLoading: courseByIdLoading,refetch } =
    useGetCourseByIdQuery(courseId,{refetchOnMountOrArgChange:true});

  const [publishCourse] = usePublishCourseMutation()
  const navigate = useNavigate();
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  useEffect(() => {
    const course =  courseByIdData?.data;  
    if (course) {
      setInput({
        courseTitle: course?.courseTitle,
        subTitle: course?.subTitle,
        description: course?.description,
        category: course?.category,
        courseLevel: course?.courseLevel,
        coursePrice: course?.coursePrice,
        courseThumbnail: "",
      });
    }
  }, [courseByIdData]);
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (val) => {
    setInput({ ...input, category: val });
  };
  const slectCourseLevel = (val) => {
    setInput({ ...input, courseLevel: val });
  };
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader?.result);
      fileReader.readAsDataURL(file);
    }
  };

  const [editCourse, { isLoading, isSuccess, error }] = useEditCourseMutation();

  const updateCourseHandler = async () => {
    // console.log(input);
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    await editCourse({ formData, courseId });
  };

  // console.log(courseByIdData?.data?.isPublished);
  const publishStatusHandler = async(action)=>{
    // console.log(action);
    
    try {
      // console.log(courseId,action);
      
    const res = await publishCourse({courseId,query:action})
    if (res?.data) {
      refetch()
      // console.log(res?.data);
      
      toast.success(res?.data?.message)
    }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to publish or unpublish.")
    }

  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated.");
    }
    if (error) {
      toast.error("try again.failed to update!");
    }
  }, [isSuccess, error]);
  if (courseByIdLoading) {
    return <Loader2 className="w-14 h-14 animate-spin"/>
  }
 
  
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Basic Course Info</CardTitle>
            <CardDescription>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus
              recusandae at in laudantium adipisci fugiat?
            </CardDescription>
          </div>
          <div className="space-x-3">
            <Button variant="outline" onClick={()=>publishStatusHandler(courseByIdData?.data?.isPublished ? "false":"true")}>
              {courseByIdData?.data?.isPublished ? "Published" : "Unpublish"}
            </Button>
            <Button>Remove Course</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-5">
            <div>
              <Label>Course Title</Label>
              <Input
                value={input.courseTitle}
                onChange={changeEventHandler}
                type="text"
                name="courseTitle"
                placeholder="Course title..."
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                value={input.subTitle}
                onChange={changeEventHandler}
                type="text"
                name="subTitle"
                placeholder="subtitle..."
              />
            </div>
            <div>
              <Label>Description</Label>
              <RichTextEditor input={input} setInput={setInput} />
            </div>
            <div className="flex items-center gap-5">
              <div>
                <Label>Category</Label>
                <Select onValueChange={selectCategory}>
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
              <div>
                <Label>Course level</Label>
                <Select onValueChange={slectCourseLevel}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Level</SelectLabel>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Advance">Advance</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  name="coursePrice"
                  value={input.coursePrice}
                  onChange={changeEventHandler}
                  placeholder={`199`}
                  className="w-fit"
                />
              </div>
              <div>
                <Label>Course Thumbnail</Label>
                <Input
                  onChange={selectThumbnail}
                  type="file"
                  accept="image/*"
                  className="w-fit"
                />
                {previewThumbnail && (
                  <img
                    src={previewThumbnail}
                    alt="preview"
                    className="w-64 my-2"
                  />
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/course")}
                >
                  Cancel
                </Button>
                <Button onClick={updateCourseHandler} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait!
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CourseTab;
