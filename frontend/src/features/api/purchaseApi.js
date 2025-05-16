import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PURCHASE_API = "http://localhost:8080/api/v1/";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "purchase/checkout/create-checkout-session",
        method: "POST",
        body: { courseId },
      }),
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `purchase/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getAllPurchaseCourses: builder.query({
      query: () => ({
        url: `purchase/get-purchase-course`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetAllPurchaseCoursesQuery,
  useGetCourseDetailWithStatusQuery,
} = purchaseApi;
