import { Edit3Icon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

function Lecture({ lecture, index, courseId }) {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`/admin/course/${courseId}/lecture/${lecture?._id}`);
  };
  return (
    <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-600 px-2 py-4 rounded-md m-3">
      <h1 className="font-bold text-gray-800 dark:text-white">
      Lecture - {index+1} : {lecture?.lectureTitle}
      </h1>
      <Edit3Icon
        className="cursor-pointer text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300"
        onClick={goToUpdateLecture}
      />
    </div>
  );
}

export default Lecture;
