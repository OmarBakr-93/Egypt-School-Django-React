import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Teachers() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8000/teachers/')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`❌ Server error: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        setTeachers(data)
      })
      .catch((err) => {
        console.error('Error fetching teachers:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-5 mt-16">
      <h3 className="my-5">Our teachers</h3>

      {/*  Skeleton */}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
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
          {teachers.slice(0, 3)?.map((teacher, index) => (
            <div
              key={index}
              onClick={() => navigate(`/teachers/${teacher.id}`)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img className="w-full h-50 object-cover" src={teacher?.image} />

              <div className="p-4">
                <h2 className="text-[#b04ba2] font-bold text-[18px]">
                  {teacher?.name}
                </h2>

                <p className="text-gray-500 mb-2 truncate">
                  {teacher?.subject}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
