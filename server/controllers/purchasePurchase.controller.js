import Stripe from "stripe"
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/purchaseCourse.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const createCheckoutSession = async(req,res)=>{
    // console.log("session");
    try {
        const userId = req.id;
        const {courseId} = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success:false,
                message:"Course not found."
            })
        };

        // create course purchase record
        const newPurchase = new CoursePurchase({
            courseId,
            userId,
            amount:course?.coursePrice,
            status:"pending"
        });

        // create stripe session checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:[
                {
                    price_data:{
                        currency:"inr",
                        product_data:{
                            name:course?.courseTitle,
                            images:[course?.courseThumbnail],
                        },
                        unit_amount:course?.coursePrice*100,
                    },
                    quantity:1,
                },
            ],
            mode:"payment",
            success_url:`${process.env.FRONTEND_URL}/course-progress/${courseId}`,
            cancel_url:`${process.env.FRONTEND_URL}/course-detail/${courseId}`,
            metadata:{
                courseId:courseId,
                userId:userId,
                paymentId:newPurchase?._id.toString()
            },
            shipping_address_collection:{
                allowed_countries:["IN"]
            },
        });
        // console.log(session);
        
        if (!session.url || !session.id) {
            return res.status(400).json({
                success:false,
                message:"Error while creating session url"
            })
        };

        // save purchase record
        newPurchase.paymentId = session.id;
        // newPurchase.paymentId = session.id;
        // console.log("Create session paymentId",newPurchase?._id.toString());
        await newPurchase.save();

        

        return res.status(200).json({
            success:true,
            url:session.url
        })
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            success:false,
            message:`Error while creating session url : ${error?.message}`
        })
        
    }
};

export const webhook = async(req,res)=>{
    let event;
    try {
        const payloadString = JSON.stringify(req.body,null,2);
        const secret = process.env.STRIPE_WEBHOOK_SECRET;

        const header = stripe.webhooks.generateTestHeaderString({
            payload:payloadString,
            secret,
        });
        event = stripe.webhooks.constructEvent(payloadString,header,secret);
    } catch (error) {
        return res.status(400).send(`webhook error: ${error?.message}`)
    }
    console.log(event.type);
    
    if (event.type === "payment_intent.succeeded") {
        try {
            const session = event.data.object;
            const purchase = await CoursePurchase.findOne({
                paymentId:session?.id
            }).populate({path:"courseId"});

            if (!purchase) {
                return res.status(404).json({message:"Purchase not found",success:false})
            }
            if (session.amount_total) {
                purchase.amount = session.amount_total/100;
            }
            purchase.status = "completed";

            // purchase complete then make all lecture to visible
            if (purchase.courseId && purchase.courseId.lectures.length > 0) {
                await Lecture.updateMany(
                    {_id:{$in:purchase.courseId.lectures}},
                    {$set:{isPreviewFree:true}}
                )
            }
            await purchase.save();

            // update user enrolledCourse
            await User.findByIdAndUpdate(purchase.userId,{$addToSet:{enrolledCourses:purchase.courseId._id}},{new:true});

            // enrolled students
            await Course.findByIdAndUpdate(purchase.courseId._id,{$addToSet:{enrolledStudent:purchase.userId}},{new:true});
            res.status(200).send();

        } catch (error) {
            console.log(error?.message);
            return res.status(500).json({success:false,message:"Internal server Error."})
        }
    }
}


export const getCourseDetailWithPurchaseStatus = async(req,res)=>{
    try {
        const {courseId} = req.params;
        const userId = req.id;

        const course = await Course.findById(courseId).populate({path:"creator"}).populate({path:"lectures"});
        const purchased = await CoursePurchase.findOne({userId,courseId});
        // console.log(purchased);
        
        if (!course) {
            return res.status(404).json({message:"Course not found.",success:false})
        }
        // if (!purchased) {
        //     return res.status(404).json({message:"Purchased course not found."})
        // }
        return res.status(200).json({
            success:true,
            status:!!purchased,
            data:course   
        })

    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({success:false,message:"Internal server Error."})
    }
}


export const getAllPurchasedCourse = async(req,res)=>{
    try {
        const purchasedCourses = await CoursePurchase.find({status:"completed"}).populate("courseId");
        if (!purchasedCourses) {
            return res.status(404).json({
                data:[]
            })
        }

        return res.status(200).json({
            success:true,
            data:purchasedCourses
        });
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({success:false,message:"Internal server Error."})
    }
}

  

