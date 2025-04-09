import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

function Course() {
  return (
    <>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VifGVufDB8fDB8fHww"
            alt="course_pic"
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="space-y-2">
          <h1 className="hover:underline font-bold text-lg truncate">
            Docker full course Hindi $ English
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Avatar_image"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm">Hemant Instructor</h1>
            </div>
            <Badge className={`bg-blue-600 text-white px-2 py-1 text-xs rounded-full`}>Advance</Badge>
          </div>
          <div className="text-lg">
            <span>₹4990</span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default Course;
