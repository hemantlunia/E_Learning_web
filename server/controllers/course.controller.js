import { Course } from "../models/course.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        success: false,
        message: "Course title or category are required.",
      });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res.status(201).json({
      success: true,
      data: course,
      message: "Course created.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create course.",
      success: false,
    });
  }
};

// get course
export const getCreatorCourse = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({
        message: "Course not found.",
        success: false,
        data: [],
      });
    }
    return res.status(200).json({
      message: "Course fetched.",
      success: true,
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch creator course.",
      success: false,
    });
  }
};

// Edit course
export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    // console.log(courseId,req.body,req.file);

    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    // console.log(courseTitle,subTitle,description,category,courseLevel,coursePrice);
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = await course.courseThumbnail
          .split("/")
          .pop()
          .split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };
    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Course updated",
      data: course,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: `Failed to Edit course. : ${error}`,
      success: false,
    });
  }
};

// get course by id
export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: `Course not foudd`,
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      data: course,
      message: "Course fetched.",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to get course by Id. : ${error?.message}`,
      success: false,
    });
  }
};

// publish unpublish course
export const togglePublishUnpublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;
    // console.log(publish);

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: `Course not found to publish unpublish.`,
        success: false,
      });
    }

    course.isPublished = publish == "true";
    await course.save();

    const statusMessage = course.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      success: true,
      message: `Course is ${statusMessage}`,
    });
  } catch (error) {
    console.log(error?.message);

    return res.status(500).json({
      message: `Failed to get course by Id. : ${error?.message}`,
      success: false,
    });
  }
};

// get publish course
export const getPublishedCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoUrl",
    });
    if (!courses) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Course not found.",
      });
    }
    return res.status(200).json({
      success: true,
      data: courses,
      message: "Course fetched.",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to find published courses. : ${error?.message}`,
      success: false,
    });
  }
};

// searchCourse
export const searchCourse = async (req, res) => {
  try {
    const {query="",categories=[],sortByPrice=""} = req.query;

    // create search query
    const searchCriteria = {
      isPublished:true,
      $or:[
        {
          courseTitle:{$regex:query,$options:"i"}
        },
        {
          subTitle:{$regex:query,$options:"i"}
        },
        {
          category:{$regex:query,$options:"i"}
        },
      ]
    };

    // if categories are selected
    if(categories.length > 0){
searchCriteria.category = {$in:categories}
    }

    // sorting
    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1; //assending order
    } else if(sortByPrice === "high"){
sortOptions.coursePrice = -1; //descending
    }

    let courses = await Course.find(searchCriteria).populate({path:"creator", select:"name photoUrl"}).sort(sortOptions);

    return res.status(200).json({
      success:true,
      data:courses || []
    })
  } catch (error) {
    return res.status(500).json({
      message: `Failed to find search courses. : ${error?.message}`,
      success: false,
    });
  }
};
