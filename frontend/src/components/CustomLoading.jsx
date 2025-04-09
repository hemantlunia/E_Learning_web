import { useLoadUserQuery } from "@/features/api/authApi";
import LoadingSpinner from "./LoadingSpinner";

const Custom = ({children})=>{
    const {isLoading} = useLoadUserQuery();
    return <>
    {isLoading ? (<LoadingSpinner/>):(<>{children}</>)}
    </>
  }

  export default Custom;