import express from "express"
import { createCourse, editCourse, getCourseById, getCreatorCourse, getPublishedCourse, searchCourse, togglePublishUnpublishCourse } from "../controllers/course.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const courseRouter = express.Router();

courseRouter.post("/create",isAuthenticated,createCourse);
courseRouter.get("/getCreatorCourse",isAuthenticated,getCreatorCourse);
courseRouter.put("/edit/:courseId",isAuthenticated,upload.single("courseThumbnail"),editCourse);
courseRouter.get("/getCourse/:courseId",isAuthenticated,getCourseById);
courseRouter.put("/publish-unpublish/:courseId",isAuthenticated,togglePublishUnpublishCourse);
courseRouter.get("/published-courses",isAuthenticated,getPublishedCourse);
courseRouter.get("/search",isAuthenticated,searchCourse);


export default courseRouter;