import about from '../assets/about.jpg'

function AboutUs() {
    return (
    <div className='max-w-7xl mx-auto p-5 mt-16 grid grid-cols-1 lg:grid-cols-2'>


        <div className='flex justify-center'>
        <img className='rounded-lg'  src={about}/>
        </div>
        <div className='flex justify-center flex-col items-center'>
            <h3>About Us</h3>
            <h1 className='mt-3 text-xl'>We Learn Smart Way To Build Bright Futute For Your Children
            </h1>
            <p className='text-gray-400 mt-3'>At our school, we believe every child carries endless potential waiting to shine. Through creative programs, engaging activities, and caring teachers, we nurture curiosity and confidence in every step of their journey.
            Our mission is to inspire young minds, build strong values, and provide a safe and joyful environment where learning feels like play and every child feels special.</p>

        </div>
        </div>
)
}

export default AboutUs