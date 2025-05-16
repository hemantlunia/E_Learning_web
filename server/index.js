import express from "express"
import dotenv from "dotenv"
import { connectToDb } from "./DB/connectToDb.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import lectureRouter from "./routes/lecture.route.js";
import mediaRouter from "./routes/media.route.js";
import purchaseRouter from "./routes/purchaseCourse.route.js";
// import { Course } from "./models/course.model.js";
// import { User } from "./models/user.model.js";
// import { Lecture } from "./models/lecture.model.js";
// import Stripe from "stripe";
// import { CoursePurchase } from "./models/purchaseCourse.model.js";
import courseProgressRouter from "./routes/courseProgress.route.js";

const app = express();
dotenv.config();

app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}));

// app.post("/webhook",express.raw({ type: "application/json" }),async (req, res) => {
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//     let event;
//     const secret = process.env.STRIPE_WEBHOOK_SECRET;
//     // console.log(secret);
    
  
//     try {
//       const sig = req.headers['stripe-signature'];
  
//       event = stripe.webhooks.constructEvent(req.body, sig, secret);
//     } catch (error) {
//       console.log("Webhook error:", error.message);
//       return res.status(400).send(`Webhook Error: ${error.message}`);
//     }

//     // console.log("Eventsss", event.type);
    
  
//     if (event.type === "checkout.session.completed") {
//       try {
//         const session = event.data.object;
//         const fullSession = await stripe.checkout.sessions.retrieve(session.id);
//         console.log(fullSession.metadata);
        
  
//         // console.log(session,"payment ID in index");
        
//         const purchase = await CoursePurchase.findOne({
//           paymentId: session?.metadata?.paymentId,
//         }).populate({ path: "courseId" });
//         // console.log(purchase,"Purchase");
        
//         // console.log(purchase,"Purchase Id payment document");
        
  
//         if (!purchase) {
//           return res.status(404).json({ message: "Purchase not found", success: false });
//         }
  
//         if (session.amount_total) {
//           purchase.amount = session.amount_total / 100;
//         }
//         purchase.status = "completed";
  
//         // Unlock all lectures
//         if (purchase.courseId && purchase.courseId.lectures.length > 0) {
//           await Lecture.updateMany(
//             { _id: { $in: purchase.courseId.lectures } },
//             { $set: { isPreviewFree: true } }
//           );
//         }
//         await purchase.save();
  
//         // Add to user's enrolled courses
//         await User.findByIdAndUpdate(
//           purchase.userId,
//           { $addToSet: { enrolledCourses: purchase.courseId._id } },
//           { new: true }
//         );
  
//         // Add to course's enrolled students
//         await Course.findByIdAndUpdate(
//           purchase.courseId._id,
//           { $addToSet: { enrolledStudent: purchase.userId } },
//           { new: true }
//         );
  
//         res.status(200).json({ received: true });
//       } catch (error) {
//         console.log(error?.message);
//         return res.status(500).json({ success: false, message: "Internal server error." });
//       }
//     } else {
//       res.status(200).json({ received: true });
//     }
//   });

// app.post(
//     "/webhook",
//     express.raw({ type: "application/json" }),
//     async (req, res) => {
//       const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//       const secret = process.env.STRIPE_WEBHOOK_SECRET;
  
//       let event;
  
//       try {
//         console.log("entering in webhokkkkkkkkkkkk route");
        
//         const sig = req.headers["stripe-signature"];
//         event = stripe.webhooks.constructEvent(req.body, sig, secret);
//       } catch (error) {
//         console.error("Webhook Error:", error.message);
//         return res.status(400).send(`Webhook Error: ${error.message}`);
//       }
  
//       console.log("Stripe Event Type:", event.type);
  
//       // Switch to handle different event types
//       switch (event.type) {
//         case "checkout.session.completed":
//           try {
//             console.log("checkout.session.completed if condition running");
            
//             const session = event.data.object;
//             // console.log("session......",session);
//             console.log("sessionId......",session.id);
            
  
//             const purchase = await CoursePurchase.findOne({
//               paymentId: session.id,
//             }).populate({ path: "courseId" });
//             console.log("Purchase DB...",purchase);
            
  
//             if (!purchase) {
//               console.log("Purchase not found for session:", session.id);
//               return res.status(404).json({ success: false, message: "Purchase not found." });
//             }
  
//             // Update purchase
//             if (session.amount_total) {
//               purchase.amount = session.amount_total / 100;
//             }
//             purchase.status = "completed";
//             await purchase.save();
  
//             // Unlock lectures
//             if (purchase.courseId && purchase.courseId.lectures.length > 0) {
//               await Lecture.updateMany(
//                 { _id: { $in: purchase.courseId.lectures } },
//                 { $set: { isPreviewFree: true } }
//               );
//             }
  
//             // Update user and course
//             await User.findByIdAndUpdate(
//               purchase.userId,
//               { $addToSet: { enrolledCourses: purchase.courseId._id } },
//               { new: true }
//             );
//             await Course.findByIdAndUpdate(
//               purchase.courseId._id,
//               { $addToSet: { enrolledStudent: purchase.userId } },
//               { new: true }
//             );
  
//             console.log("Course successfully unlocked for user:", purchase.userId);
//             res.status(200).json({ received: true });
  
//           } catch (error) {
//             console.error("Error handling checkout.session.completed:", error.message);
//             return res.status(500).json({ success: false, message: "Internal server error." });
//           }
//           break;
  
//         // Other events can be added here
//         case "payment_intent.succeeded":
//           console.log("Payment Intent was successful!");
//           // you can add logic if you want here
//           res.status(200).send({ received: true });
//           break;
  
//         default:
//           console.log(`Unhandled event type: ${event.type}`);
//           res.status(200).send({ received: true });
//           break;
//       }
//     }
//   );
  
app.use(express.json());

app.use(express.urlencoded({extended:true})); 
app.use(cookieParser());

// routes user
app.use("/api/v1/user",userRouter);

// routes course
app.use("/api/v1/course",courseRouter);

// routes lecture
app.use("/api/v1/lecture",lectureRouter);

// media upload
app.use("/api/v1/media",mediaRouter);

// purchse
app.use("/api/v1/purchase",purchaseRouter);

// course progress 
app.use("/api/v1/progress",courseProgressRouter)


app.listen(process.env.PORT,()=>{
    console.log("server running ",process.env.PORT);
    connectToDb();
});