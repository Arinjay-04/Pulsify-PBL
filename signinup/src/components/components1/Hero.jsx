

const Hero = () => {
  return (
    <section className='flex justify-center items-center'>
      <div className='flex bg-blue-100 justify-center items-center rounded-md p-6 w-[1270px] m-10 max-md:flex-col-reverse'>
        <div className='w-[50%]'>
          <h2 className='text-4xl font-bold drop-shadow-sm'>Find the best Hospitals in Emergency</h2>
          <p className='text-slate-700 py-9 font-normal w-[80%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eos cum consectetur, suscipit consequatur nisi rem alias impedit officia dolorum.</p>
          <button className='bg-blue-500 py-2 px-4 rounded-full font-bold text-white hover:bg-blue-600'>Find Hospital</button>
        </div>
        <img src="/Assets/images/hospital.svg" alt="doctor-image" className='w-[350px] h-[350px]'/>
      </div>
    </section>
  )
}

export default Hero