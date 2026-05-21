import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Grades from './pages/Grades'
import TeacherDetails from './pages/details/TeacherDetails'
import ProgramDetails from './pages/details/ProgramDetails'
import EventDetails from './pages/details/EventDetails'
import TestimonialForm from './pages/TestimonialForm'


function App() {
  

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/grades" element={<Grades/>}/> 
        <Route path="/teachers/:id" element={<TeacherDetails/>}/> 
        <Route path="/programs/:id" element={<ProgramDetails/>}/> 
        <Route path="/events/:id" element={<EventDetails/>}/> 
        <Route path="/testimonial" element={<TestimonialForm/>}/>
      </Routes>
    </div>
  )
}

export default App
