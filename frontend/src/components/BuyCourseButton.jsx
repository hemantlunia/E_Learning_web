import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useCreateCheckoutSessionMutation } from '@/features/api/purchaseApi'
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

function BuyCourseButton({courseId}) {
    const [createCheckoutSession,{data,isLoading,isSuccess,isError}] = useCreateCheckoutSessionMutation();
     
    const purchaseCourseHandler = async()=>{
        await createCheckoutSession(courseId)
    }

    useEffect(()=>{
        if (isSuccess) {
            if (data?.url) {
                window.location.href = data.url;
            } else{
                toast.error("Invalid url from server.try again.....")
            }
        }
        if (isError) {
            toast.error("Failed to create checkout.")
        }
    },[data,isSuccess,isError])
   
  return (
    
        <Button disabled={isLoading} className="w-full" onClick={purchaseCourseHandler}>
            {
                isLoading ? (
                    <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                    Please wait!
                    </>
                ):"Purchase Course"
            }
        </Button>
    
  )
}

export default BuyCourseButton