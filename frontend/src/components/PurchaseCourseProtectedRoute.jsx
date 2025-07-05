import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import {useParams,Navigate} from "react-router"

const PurchaseCourseProtectedRoute = ({children})=>{
    const {courseId} = useParams();
    const {data,isLoading} = useGetCourseDetailWithStatusQuery(courseId);

    if (isLoading) {
        return <p>Loading...</p>
    }

    return data?.data ? children : <Navigate to={`/course-detail/${courseId}`}/>
}

export default PurchaseCourseProtectedRoute;