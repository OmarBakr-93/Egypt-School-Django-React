import {  Calendar, Clock, MapPin } from 'lucide-react'
import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function EventDetails() {

    
    const {id} = useParams()

  const [event, setEvent] = useState(null)
    const [loading , setLoading] = useState(true)


      useEffect(()=>{
                fetch(`http://127.0.0.1:8000/events/${id}`)
                .then((res) => {
                if (!res.ok) {
                  throw new Error(`❌ Server error: ${res.status}`);
                }
                return res.json();
              })
                .then((data)=>{
                    setEvent(data)
                  
        
                })
                .catch((err)=>{
                    console.error("Error fetching events:", err);
                }).finally(()=>{
                    setLoading(false)
                })
            },[id])


     if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 animate-pulse">Loading event...</p>
      </div>
    );
  }        
  return (
    <div className='max-w-5xl mx-auto p-6 mt-10'>

        <div className='bg-white shadow-lg rounded-xl overflow-hidden'>

        </div>
        <img src={event.image}  className='w-full h-72 object-cover' />

         {/* Content */}


         <div className='p-6 space-y-4'>
          <h1 className="text-3xl font-bold text-[#b04ba2]">{event.title}</h1>
          <p className="text-gray-600 leading-relaxed">{event.description}</p>
         </div>


           {/* Info cards */}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
            <div className='flex items-center gap-3 p-4 bg-violet-50 rounded-lg'>

                <Calendar />
                <div>

             <p className="text-sm text-gray-500">Date</p>
             <p className="font-semibold">${event.date}</p>
             </div>
                
            </div>



              <div className='flex items-center gap-3 p-4 bg-violet-50 rounded-lg'>

                <Clock/>
                <div>

             <p className="text-sm text-gray-500">Time</p>
             <p className="font-semibold"> {event.time_from} - {event.time_to}</p>
             </div>
                
            </div>



              <div className='flex items-center gap-3 p-4 bg-violet-50 rounded-lg'>

                <MapPin/>
                <div>

             <p className="text-sm text-gray-500">Location</p>
             <p className="font-semibold">{event.location}</p>
             </div>
                
            </div>






        </div>  


         {/* Teacher */}


         {event?.teacher && (
            <div className='mt-8 p-4 border rounded-lg flex items-center gap-4'>

                {event?.teacher?.image && (
                    <img className='w-44 h-44 object-cover rounded-full border' src={event.teacher.image}/>


                )}

            <div>
              <p className="text-sm text-gray-500">Teacher</p>
              <p className="font-semibold">{event.teacher.name}</p>
              <p className="text-sm text-gray-600">{event.teacher.subject}</p>
              </div>


            </div>
         )} 



    </div>
  )
}

export default EventDetails