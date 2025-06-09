import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllPurchaseCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import {Legend,XAxis,YAxis,Line,LineChart,ResponsiveContainer,Tooltip,CartesianGrid} from "recharts"

function Dashboard() {
  const {data,isError,isLoading} = useGetAllPurchaseCoursesQuery();

  if (isLoading) {
    return <h1>Loading....</h1>
  }
  if (isError) {
    return <h1 className="text-red-500">Failed to get purchased Details...</h1>
  }

  const purchasedCourse = data?.data || [];

  // console.log("Purchasecourse...",data);
  

  const courseData = purchasedCourse.map((course)=>({
    name:course?.courseId?.courseTitle,
    price:course?.courseId?.coursePrice
  }));

  const totalRevenue = purchasedCourse.reduce((acc,ele)=>acc + (ele.amount || 0),0)
  // Formatter for axis (e.g., 12000 → 12K)
const formatYAxis = (tick) => {
  return `${tick / 1000}K`;
};

// Tooltip formatter
const tooltipFormatter = (value) => {
  return [`₹${value.toLocaleString()}`, "Sales"];
};


  return (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{purchasedCourse?.length}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalRevenue}</p>
          </CardContent>
        </Card>

        </div>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Course Prices</CardTitle>
          </CardHeader>
          <CardContent>
          <ResponsiveContainer width="100%" height={250}>
        <LineChart data={courseData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip formatter={tooltipFormatter} />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#4F46E5"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
          </CardContent>
        </Card>

       
     
    </>
  );
}

export default Dashboard;
