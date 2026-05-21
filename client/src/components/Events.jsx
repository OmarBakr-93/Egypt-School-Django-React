import  { useEffect, useState } from 'react'
import { Clock, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  useEffect(() => {
    fetch('http://127.0.0.1:8000/events/')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`❌ Server error: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        setEvents(data)
      })
      .catch((err) => {
        console.error('Error fetching events:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-5 mt-16">
      <h3 className="my-5">Our Events</h3>

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
          {events.slice(0, 3)?.map((event, index) => (
            <div
              key={index}
              onClick={() => navigate(`/events/${event.id}`)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img className="w-full h-48 object-cover" src={event?.image} />

              <div className="p-4">
                <h2 className="text-[#b04ba2] font-bold text-[18px]">
                  {event?.title}
                </h2>

                <p className="text-gray-500 mb-2 truncate">
                  {event?.description}
                </p>
                <div className="flex items-center justify-between">
                  <strong className=" text-[#b04ba2] flex items-center gap-3 font-bold ">
                    <Clock /> {event?.time_from} - {event.time_to}
                  </strong>
                </div>

                <p className=" gap-3 flex items-center text-[#b04ba2] mt-3 text-sm">
                  <MapPin /> {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
