import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import logo from '../assets/logo.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()

  const logout = useContext(AuthContext)

  const token = localStorage.getItem('token')
  const [role, setRole] = useState(localStorage.getItem('role'))

  useEffect(() => {
    if (token) {
      fetch('http://127.0.0.1:8000/profiles/', {
        headers: { Authorization: `Token ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setRole(data[0].role)
            localStorage.setItem('role', data[0].role)
          }
        })

        .catch((err) => console.error('Error fetching profile:', err))
    }
  }, [token])

  return (
    <div className="text-sm text-white w-full ">
      <div className="text-center font-medium py-2 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
        <p>
          New Academic Year Admissions Now Open –{' '}
          <span className="underline underline-offset-2">Apply Today !</span>
        </p>
      </div>
      <nav className="relative h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 transition-all shadow">
        <img className="w-40 h-40" src={logo} />
        <ul className="hidden md:flex items-center gap-3 space-x-8 md:pl-28">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/teachers"> Teachers</a>
          </li>
          <li>
            <a href="/Programs"> Programs</a>
          </li>
          <li>
            <a href="/events"> Events</a>
          </li>
          <li>
            <a href="/testimonial"> Testimonials</a>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          {!role ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className="hidden md:block text-[#C45B7D]  bg-white hover:bg-gray-50 border border-gray-300  px-9 py-2 rounded-full active:scale-95 transition-all"
              >
                Login
              </button>

              <button
                onClick={() => navigate('/register')}
                className="hidden md:block text-[#C45B7D] bg-white hover:bg-gray-50 border border-gray-300  px-9 py-2 rounded-full active:scale-95 transition-all"
              >
                Register
              </button>
            </>
          ) : (
            <>
              {role === 'student' && (
                <button
                  onClick={() => navigate('/grades')}
                  className="hidden md:block text-[#C45B7D] bg-white hover:bg-gray-50 border border-gray-300 px-9 py-2 rounded-full active:scale-95 transition-all"
                >
                  My Grades
                </button>
              )}

              <button
                onClick={logout}
                className="hidden md:block text-[#C45B7D] bg-white hover:bg-gray-50 border border-gray-300 px-9 py-2 rounded-full active:scale-95 transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="menu-btn"
          type="button"
          className="menu-btn inline-block md:hidden active:scale-90 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
          >
            <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
          </svg>
        </button>

        {isOpen && (
          <div className="mobile-menu absolute top-[70px] left-0 w-full bg-white shadow-sm p-6  md:hidden z-50">
            <ul className="flex flex-col space-y-4 text-lg">
              <li>
                <a href="/" className="text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Pricing
                </a>
              </li>
            </ul>

            <button
              type="button"
              className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
            >
              Get started
            </button>
          </div>
        )}
      </nav>
    </div>
  )
}
