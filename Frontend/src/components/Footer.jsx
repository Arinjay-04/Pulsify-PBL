import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { footer_aboutus, footer_icons } from '../constants'

const Footer = () => {
  return (
    <div className='flex flex-1 justify-center items-center my-5 p-5 bg-white shadow-sm'>
      <div className='w-[1270px] flex justify-between max-lg:px-10 py-7 gap-8'>
        <div className='flex flex-col flex-1 gap-4 items-start justify-center'>
          <Logo />
          <img src="assets/images/footer_heart.svg" alt="heart" className='w-[150px] h-[200px]'/>
        </div>
        <div className='flex-1'>
          <h2 className='text-xl font-bold border-b-2 pb-2'>About Us</h2>
          {
            footer_aboutus.map((about) => (
              <div key={about.title} className='py-1 text-slate-600 hover:text-blue-500'>
                <Link to={about.link}>{about.title}</Link>
              </div>
            ))
          }
        </div>
        <div className='flex-1 '>
        <h2 className='text-xl font-bold border-b-2 pb-2'>Follow Us On</h2>
        <div className='flex gap-10 justify-center py-5'>
          {
            footer_icons.map((icon) => (
              <div key={icon.name} className='py-1 text-slate-600 hover:text-blue-500'>
                <Link ><img src={icon.icon} alt="icon" className='w-[30px] h-[30px] opacity-80 hover:bg-blue-300 rounded-md'/></Link>
              </div>
            ))
          }
        </div>
          
        </div>
      </div>
    </div>
  )
}

export default Footer