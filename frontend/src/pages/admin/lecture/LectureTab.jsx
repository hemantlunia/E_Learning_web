/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

function LectureTab() {
  const MEDIA_API = "http://localhost:8080/api/v1/media";
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const params = useParams();
  const {courseId,lectureId} = params;
  // console.log(courseId,lectureId); 
  

  const {data:lectureData} = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.data;
  


  useEffect(()=>{
    if (lecture) {
      console.log("Lecture",lecture);
      setUploadVideoInfo({
        videoUrl: lecture?.videoUrl,
        publicId: lecture?.publicId,
      })
      setLectureTitle(lecture?.lectureTitle);
      setIsFree(lecture?.isPreviewFree);
    }
  },[lectureData,lecture])
  const [editLecture,{data,isLoading,error,isSuccess}] = useEditLectureMutation()
  const [removeLecture,{isLoading:removeIsLoading,isSuccess:removeIsSuccess}] = useRemoveLectureMutation()
  const fileChangeHandler = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
        setMediaProgress(true);
      }
      // media api
      const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
        onUploadProgress: ({ loaded, total }) => {
          setUploadProgress(Math.round((loaded * 100) / total));
        },
      });
      if (res?.data?.success) {
        // console.log(res?.data?.data?.secure_url,res?.data?.data?.public_id);

        setUploadVideoInfo({
          videoUrl: res?.data?.data?.secure_url,
          publicId: res?.data?.data?.public_id,
        });
        setBtnDisable(false);
        toast.success("File uploaded");
      }
    } catch (error) {
      console.log(error?.message);
      toast.error("Video uploaded failed");
    } finally {
      setMediaProgress(false);
    }
  };

  const editLectureHandler = async()=>{
    await editLecture({
      lectureTitle,
      courseId,
      lectureId,
      isPreviewFree:isFree,
      videoInfo:uploadVideoInfo

    })
    // console.log(isFree);
  };

  const removeLecturehandler = async()=>{
   await removeLecture(lectureId);
  //  console.log(removeIsLoading,removeIsSuccess);
   
  }

  useEffect(()=>{
  if (isSuccess) {
    toast.success("Lecture Updated.")
  }
  if(error){
  toast.error("Failed to update lecture.")
  }
  

  },[isSuccess,error])

  useEffect(()=>{
    if(removeIsSuccess){
      toast.error("Lecture removed.")
      }
  },[removeIsSuccess])

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            officiis quae nobis nisi, soluta facilis.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button disabled={removeIsLoading} variant="destructive" onClick={removeLecturehandler}>{
          removeIsLoading ? <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          Please Wait!
          </>:"Remove Lecture"  
            }</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input value={lectureTitle} onChange={(e)=>setLectureTitle(e.target.value)} type="text" placeholder="Ex. lecture title..." />
        </div>
        <div>
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            placeholder="video..."
            className="w-fit"
            accept="video/*"
            onChange={fileChangeHandler}
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch id="airplane-mode" checked={isFree} onCheckedChange={(checked)=>setIsFree(checked)}/>
          <Label htmlFor="airplane-mode">{isFree ? "Free":"Paid"}</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}
        <div className="mt-4">
          <Button disabled={isLoading} onClick={editLectureHandler}>{
             isLoading ? <>
             <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
             Please Wait!
             </>:"Update Lecture" 
            }</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default LectureTab;
