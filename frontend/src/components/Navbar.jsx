/* eslint-disable react-hooks/exhaustive-deps */
import { MenuIcon, School2, User2Icon } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DarkMode from "./DarkMode";

function Navbar() {
  // const user = true;
  const {user} = useSelector(store=>store.auth)
  // console.log(user);
  
  const navigate = useNavigate();
  const [logoutUser,{isSuccess}] = useLogoutUserMutation();

  useEffect(()=>{
    if (isSuccess) {
      toast.success("User Logout.")
      navigate('/login')
    }
    
  },[isSuccess])

  const logouthandler = async()=>{
    await logoutUser()
  }

  return (
    <>
      <header className="h-16 w-full dark:border-b-gray-800 bg-white border-b dark:bg-gray-700 border-b-gray-200 fixed top-0 left-0 duration-300 z-10">
        {/* desktop */}
        <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
          <div className="">
          <Link to={`/`} className="flex items-center gap-2">
          <School2 size={30} />
            <h1 className="hidden md:block font-extrabold text-2xl">
              E-Learning
            </h1>
          </Link>
          </div>
          {/* user icon */}
          <div className="flex items-center gap-8">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    {
                      user ? (<img src={user?.photoUrl} alt="profile_pic" className="h-8 w-8"/>):(<User2Icon size={30} color="blue" />)
                    }
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem><Link to={`/my-learning`}>My Learning</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link to={`/profile`}>Edit Profile</Link></DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logouthandler}>Log out</DropdownMenuItem>
                  {
                    user?.role === "instructor" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link to={`/admin`}>Dashboard</Link></DropdownMenuItem>
                      </>
                    )
                  }
                  
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button onClick={()=>navigate("/login")} variant="outline">Login</Button>
                <Button onClick={()=>navigate("/login")} >Signup</Button>
              </div>
            )}
            {/* DARK MODE */}
            <div className="pr-2">
            <DarkMode />
            </div>
          </div>
        </div>
        {/* MOBILE device */}
        <div className="flex md:hidden items-center justify-between px-4 h-full">
          <h1 className="font-extrabold text-2xl">E-Learning</h1>
          <MobileNavbar user={user} logouthandler={logouthandler}/>
        </div>
      </header>
    </>
  );
}
export default Navbar;

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, Navigate, useNavigate } from "react-router";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const MobileNavbar = ({user,logouthandler}) => {
  // const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-blue-300"
        >
          <MenuIcon color="black" />
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader className={`flex items-center justify-between mt-2`}>
          <div className="flex gap-4">
            <SheetTitle ><Link to={`/`}>E-Learning</Link></SheetTitle>
            <DarkMode />
          </div>
          <Separator className="mr-2" />
          <nav className="flex flex-col space-y-4">
            <span><Link to={`/my-learning`}>My Learning</Link></span>
            <span><Link to={`/profile`}>Edit Profile</Link></span>
            <p onClick={logouthandler}>Log out</p>
          </nav>
        </SheetHeader>
     
      {user?.role === "instructor" && (
        <SheetFooter className={`mt-4`}>
            
          <SheetClose asChild>
            <Button onClick={()=>Navigate("/admin")}>Dashboard</Button>
          </SheetClose>
        </SheetFooter>
      )}
       </SheetContent>
    </Sheet>
  );
};
