/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import { useLoadUserQuery, useUpdateUserMutation } from "@/features/api/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Profile() {
  const [name,setName] = useState("")
  const [bio,setBio] = useState("")
  const [profilePhoto,setProfilePhoto] = useState("")

 ;

  const changeHandlerPic = (e)=>{
    const file = e.target.files?.[0];
    if(file) setProfilePhoto(file);
  }
   
    const [updateUser,{data:updateUserData,isLoading:updateUserIsLoading,isError,isSuccess}] = useUpdateUserMutation();
    
    useEffect(()=>{
      if (isSuccess) {
        toast.success("Profile updated")
        setName("")
        setBio("")
        setProfilePhoto("")
        refetch()
      }
      if (isError) {
        toast.error("Error try again!")
      }
    },[isSuccess,isError,updateUserData])
    const {data,isLoading,refetch} = useLoadUserQuery();  
    
    
    if (!data || !data.data) {
      return <p className="mt-20 text-center">Loading profile data...</p>;
    }
    if (isLoading) {
      return <h1 className="mt-20 text-center">Loading</h1>
    }
    const user = data?.data;


    const updateUserHandler = async()=>{
          const formData = new FormData();
          formData.append("name",name)
          formData.append("bio",bio)
          formData.append("profilePhoto",profilePhoto)
           
          await updateUser(formData)
    };

   

    
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-lg dark:bg-gray-800">
          <CardHeader className="flex flex-col items-center text-center">
            <img
              src={user?.photoUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
            />
            <CardTitle className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
             Name : {user?.name} ({user?.role.toUpperCase()})
            </CardTitle>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
            Email : {user?.email}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
                {user?.bio}
            </p>
          </CardHeader>

          <Separator className="my-4 dark:bg-gray-700" />

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="name"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={e=>setName(e.target.value)}
                  placeholder="update your name"
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <Label
                  htmlFor="pic"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Profile Pic
                </Label>
                <Input
                  id="pic"
                  type="file"
                  className="dark:bg-gray-700 dark:text-white"
                  accept="image/*"
                  onChange={changeHandlerPic}
                />
              </div>
              <div className="sm:col-span-2">
                <Label
                  htmlFor="bio"
                  
                  className="text-gray-700 dark:text-gray-300"
                >
                  Bio
                </Label>
                <Input
                onChange={e=>setBio(e.target.value)}
                type="text"
                  id="bio"
                  value={bio}
                  placeholder="update your bio."
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button onClick ={updateUserHandler} disabled = {updateUserIsLoading} className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">
              {
                updateUserIsLoading ? (<Loader2 className="animate-spin mr-2 h-4 w-4"/>):<p>Update</p>
              }
            </Button>
          </CardFooter>
        </Card>
      <Separator className="my-4 dark:bg-gray-700 bg-red-600" />
      <div >
        <h1 className="font-medium text-lg">Your Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 my-5">
            {
                user?.enrolledCourses?.length === 0 ? <h1>You have not enrolled yet in courses.</h1>:(
                    user?.enrolledCourses?.map((course)=>(<Course course={course} key={course?._id}/>))
                )
            }
        </div>
      </div>
      </div>
    </div>
  );
}

export default Profile;
