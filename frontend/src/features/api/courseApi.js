import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BACKEND_URL = "http://localhost:8080/api/v1/";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_course","Refetch_Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "course/create",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_course"],
    }),
    getCreatorCourse: builder.query({
      query: () => ({
        url: "course/getCreatorCourse",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_course"],
    }),
    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `course/edit/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_course"],
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `course/getCourse/${courseId}`,
        method: "GET",
      }),
     
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `lecture/createLecture/${courseId}`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getLecture: builder.query({
      query: (courseId) => ({
        url: `lecture/getLecture/${courseId}`,
        method: "GET",
      }),
      providesTags:["Refetch_Lecture"]
    }),
    editLecture: builder.mutation({
      query: ({
        courseId,
        lectureId,
        lectureTitle,
        videoInfo,
        isPreviewFree,
      }) => ({
        url: `lecture/${courseId}/editLecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
    }),
    removeLecture:builder.mutation({
        query:(lectureId)=>({
            url:`lecture/deleteLecture/${lectureId}`,
            method:"DELETE"
        }),
        invalidatesTags:["Refetch_Lecture"]
    }),
    getLectureById:builder.query({
        query:(lectureId)=>({
            url:`lecture/getLectures/${lectureId}`,
            method:"GET",
        })
    }),
    publishCourse:builder.mutation({
        query:({courseId,query})=>({
            url:`course/publish-unpublish/${courseId}?publish=${query}`,
            method:"PUT"
        }),
    }),
    getPublishedCourses:builder.query({
      query:()=>({
        url:`course/published-courses`,
        method:"GET"
      })
    })
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
  useGetPublishedCoursesQuery
} = courseApi;
