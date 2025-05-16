import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";
import { createLecture, editLecture, getCourseLecture, getLectureById, removeLecture } from "../controllers/lecture.controller.js";

const lectureRouter = express.Router();

lectureRouter.post("/createLecture/:courseId",isAuthenticated,createLecture)
lectureRouter.get("/getLecture/:courseId",isAuthenticated,getCourseLecture)
lectureRouter.post("/:courseId/editLecture/:lectureId",isAuthenticated,editLecture);
lectureRouter.delete("/deleteLecture/:lectureId",isAuthenticated,removeLecture);
lectureRouter.get("/getLectures/:lectureId",isAuthenticated,getLectureById);


export default lectureRouter;  