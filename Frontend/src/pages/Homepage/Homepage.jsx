import React from 'react'
import { Card, Footer, Hero, Navbar } from '../../components'
import { facilities } from '../../constants';

const Homepage = () => {
  return (
    <div className='bg-slate-100 h-auto'>
        <Navbar />
        <Hero />
        <div className='flex justify-center items-center my-2 py-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-[1270px] max-lg:mx-10'>
            {
              facilities.map((facility) => (
                <Card data={facility} key={facility.title}/>
              ))
            }
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default Homepage