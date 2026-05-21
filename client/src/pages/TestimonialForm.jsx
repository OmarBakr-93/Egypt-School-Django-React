import { useState, useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Star } from 'lucide-react'
import testimonials from '../assets/testimonial.png' 

function Testimonial() {
  const  token  = useContext(AuthContext)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    comment: '',
    rating: 5,
    name: '',
    email: '',
  })

  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) {
      setMessage('❌ You must be logged in to add a testimonial')
      return
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/testimonials/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },

        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error('❌ Failed to submit testimonial')
      }

      setMessage(' Testimonial submitted successfully!')

      setForm({ comment: '', rating: 5 })

      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      setMessage(error.message)
    }
  }
  const handleRatingChange = (val) => {
    setForm({ ...form, rating: val })
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* form */}

      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h3 className=" mb-6 text-center">Add your Testimonial</h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="name"
              name="name"
              placeholder="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-3 rounded focus:ring focus:ring-blue-300"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border p-3 rounded focus:ring focus:ring-blue-300"
              required
            />

            <textarea
              type="text"
              name="comment"
              placeholder="comment"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className="border p-3 rounded focus:ring focus:ring-blue-300"
              required
            ></textarea>

            <div className="flex gap-2 text-2xl">
              {[1, 2, 3, 4, 5].map((val) =>
                val <= form.rating ? (
                  <Star
                    key={val}
                    className="w-7 h-7 text-yellow-400 cursor-pointer transition"
                    onClick={() => handleRatingChange(val)}
                  />
                ) : (
                  <Star
                    key={val}
                    onClick={() => handleRatingChange(val)}
                    className={`w-7 h-7 cursor-pointer transition ${
                      val <= form.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                )
              )}
            </div>

            <button type="submit" className="text-white py-3 rounded-lg">
              Send
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-gray-700">{message}</p>
          )}
        </div>
      </div>

      <div className="flex-1 hidden md:flex">
        <img className="w-full h-full object-cover" src={testimonials} />
      </div>
    </div>
  )
}

export default Testimonial
