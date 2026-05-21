import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
function Testimonial() {

    const [testimonials,setTestimonials] = useState([])
    const [loading , setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/testimonials/")
        .then((res) => {
        console.log("📡 Response status:", res.status);
        if (!res.ok) {
          throw new Error(`❌ Server error: ${res.status}`);
        }
        return res.json();
      })
        .then((data)=>{
            console.log("✅ testimonials data:", data);
            setTestimonials(data)
          

        })
        .catch((err)=>{
            console.error("Error fetching testimonials:", err);
        }).finally(()=>{
            setLoading(false)
        })
    },[])

  return (
    <div className='max-w-7xl mx-auto p-5 mt-16'>
            <h3 className='my-5'>Our testimonials</h3>

        {/*  Skeleton */}

        {loading ?(
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {[1,2,3].map((i)=> (
                    <div className='animate-pulse bg-white rounded-lg shadow-md overflow-hidden'>
                  <div className="w-full h-48 bg-gray-300"></div>  
                   <div className='p-4'>

            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              </div>
               </div>
                ))}

            </div>     
        ):(
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {testimonials.slice(0, 3)?.map((testimonial)=>(
             <div onClick={()=> navigate(`/testimonials/${testimonial.id}`)} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition'>
                <div className='flex items-center gap-3'>
 <img className='h-10 object-cover' src="/profile.jpg"/>
            
            
        <div className='flex flex-col '>   
         <span className='text-gray-500'>{testimonial?.user?.name}</span>

        <span className='text-gray-500 text-sm'>{testimonial?.user?.email}</span>
             </div> 
              </div>
            

              <div className='p-4'>
              
               
             <p className='mt-2 text-gray-500'>{testimonial?.comment}</p>   
            
            <p className='flex text-yellow-500 mt-3 mb-2'>
                
            {Array.from({length:5}).map((_,i)=> (
                <Star key={i} size={18} fill={i < testimonial?.rating ?"gold" :"none"} stroke="gold"/>
            ))}    
               </p>
         

               </div>  


            </div>  
                ) )}


            </div>
        )}     
    </div>
   
  )
}

export default Testimonial