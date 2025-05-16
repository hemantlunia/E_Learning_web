import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getCourseProgress,
  markAsCompleted,
  markAsInCompleted,
  updateLectureProgress,
} from "../controllers/courseProgress.controller.js";

const courseProgressRouter = express.Router();

courseProgressRouter.get("/:courseId", isAuthenticated, getCourseProgress);
courseProgressRouter.post(
  "/:courseId/lecture/:lectureId/view",
  isAuthenticated,
  updateLectureProgress
);
courseProgressRouter.post(
  "/:courseId/complete",
  isAuthenticated,
  markAsCompleted
);
courseProgressRouter.post(
  "/:courseId/incomplete",
  isAuthenticated,
  markAsInCompleted
);

export default courseProgressRouter;
