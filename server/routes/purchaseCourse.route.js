import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, webhook } from "../controllers/purchasePurchase.controller.js";

const purchaseRouter = express.Router();

purchaseRouter.post("/checkout/create-checkout-session",isAuthenticated,createCheckoutSession);
purchaseRouter.post("/webhook",express.raw({type:"application/json"}),webhook);
purchaseRouter.get("/course/:courseId/detail-with-status",isAuthenticated,getCourseDetailWithPurchaseStatus); 
purchaseRouter.get("/get-purchase-course",isAuthenticated,getAllPurchasedCourse);

export default purchaseRouter;
  