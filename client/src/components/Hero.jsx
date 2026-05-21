import hero from '../assets/hero.jpg'

export default function Hero() {
  return (
    <div className='relative h-[600px] w-full'>
  <img className='absolute inset-0 w-full h-full object-cover' src={hero}/>
    
    <div className='absolute inset-0 bg-black/50'></div>
  
    </div>
  )
}