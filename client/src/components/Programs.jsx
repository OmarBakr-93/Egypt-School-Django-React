import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Programs() {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://127.0.0.1:8000/programs/')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`❌ Server error: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        setPrograms(data)
      })
      .catch((err) => {
        console.error('Error fetching programs:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-5 mt-16">
      <h3 className="my-5">Our Programs</h3>

      {/*  Skeleton */}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.slice(0, 3)?.map((program,index) => (
            <div
              key={index}
              onClick={() => navigate(`/programs/${program.id}`)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img className="w-full h-48 object-cover" src={program?.image} />

              <div className="p-4">
                <h2 className="text-[#b04ba2] font-bold text-[18px]">
                  {program?.title}
                </h2>

                <p className="mt-2">Teacher: {program?.teacher?.name}</p>

                <p className="text-gray-500 mb-2">{program?.description}</p>
                <div className="flex items-center justify-between">
                  <strong className=" text-[#b04ba2] font-bold ">
                    Price: {program?.price}
                  </strong>

                  <p className="text-gray-500 text-sm">
                    Lessons: {program.lessons} | Hours: {program.hours}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
