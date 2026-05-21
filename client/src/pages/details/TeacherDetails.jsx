import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function TeacherDetails() {

    const {id} = useParams()

    const [teacher , setTeacher]  = useState(null)
    const [loading , setLoading] = useState(true)

    useEffect(()=>{
            fetch(`http://127.0.0.1:8000/teachers/${id}`)
            .then((res) => {
            if (!res.ok) {
              throw new Error(`❌ Server error: ${res.status}`);
            }
            return res.json();
          })
            .then((data)=>{
                setTeacher(data)
            })
            .catch((err)=>{
                console.error("Error fetching teachers:", err);
            }).finally(()=>{
                setLoading(false)
            })
        },[id])


      if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 animate-pulse">Loading Teacher...</p>
      </div>
    );
  }   
  return (
    <div className='max-w-4xl mx-auto p-6 mt-10 bg-white shadow rounded'>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

            <div>
                <img src={teacher?.image}/>
            </div>

            <div className='p-3'>
                <strong>{teacher?.name}</strong>
                <p>{teacher?.subject}</p>
            </div>
        </div>
    </div>
  )
}

export default TeacherDetails