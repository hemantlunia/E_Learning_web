import { Course } from "../models/course.model.js";
import { CourseProgress } from "../models/courseProgress.model.js";

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    // setp-1 fetch user course progress
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");

    const courseDetails = await Course.findById(courseId).populate("lectures");
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // step - 2 if no progress found , return course with empty progress
    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDetails,
          progress: [],
          completed: false,
        },
      });
    }

    // step-3 return the user course progress along with course detail
    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress?.lectureProgress,
        completed: courseProgress?.completed,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error in getCourseProgress : ${error?.message}`,
    });
  }
};

export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    let courseProgress = await CourseProgress.findOne({ courseId, userId });

    if (!courseProgress) {
      // if no progress create new record
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }

    // find the lecture progress in the course progress
    const lectureIndex = courseProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );
    if (lectureIndex !== -1) {
      courseProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      courseProgress.lectureProgress.push({
        lectureId,
        viewed: true,
      });
    }
    // if  all lecture complete
    const lectureProgressLength = courseProgress.lectureProgress.filter(
      (lectureProg) => lectureProg.viewed
    ).length;

    const course = await Course.findById(courseId);
    if (course.lectures.length === lectureProgressLength) {
      courseProgress.completed = true;
    }
    await courseProgress.save();

    return res.status(200).json({
      message: "Lecture Progress updated.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error in updateLectureProgress : ${error?.message}`,
    });
  }
};

export const markAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course Progress not found.",
      });
    }
    courseProgress.lectureProgress.map(
      (lectureprog) => (lectureprog.viewed = true)
    );
    courseProgress.completed = true;
    await courseProgress.save();
    return res.status(200).json({
      success: true,
      message: "Course marked as completed.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error in markAsCompleted : ${error?.message}`,
    });
  }
};


export const markAsInCompleted = async (req, res) => {
    try {
      const { courseId } = req.params;
      const userId = req.id;
  
      const courseProgress = await CourseProgress.findOne({ courseId, userId });
      if (!courseProgress) {
        return res.status(404).json({
          success: false,
          message: "Course Progress not found.",
        });
      }
      courseProgress.lectureProgress.map(
        (lectureprog) => (lectureprog.viewed = false)
      );
      courseProgress.completed = false;
      await courseProgress.save();
      return res.status(200).json({
        success: true,
        message: "Course marked as Incompleted.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Server error in markAsInCompleted : ${error?.message}`,
      });
    }
  };

// 14:05
