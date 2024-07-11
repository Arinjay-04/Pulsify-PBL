import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const Navbar = () => {
  return (
    <nav className='flex w-full shadow-md p-4 justify-center items-center bg-white max-lg:px-10'>
      <div className='flex justify-between items-center w-[1270px]'>
       
        <Logo />

        <ul className='flex flex-1 justify-end gap-6 items-center text-sm font-bold text-slate-500 max-md:hidden '>
          <li className='hover:text-blue-500'>
            <Link to={`/about`}>About</Link>
          </li>
          <li className='hover:text-blue-500'>
            <Link to={`/contact`}>Contact</Link>
          </li>
          <p>
              <Link to="/signup" className='hover:text-blue-500'>Signup/</Link>
              <Link to="/login" className='hover:text-blue-500' >Login</Link>
            </p>
          {/* <li className='hover:text-blue-500'>
             <Link to={`/signup`}>Signup/</Link><Link to={`/login`}>Login</Link>
          </li> */}
          <li>
          <div className='flex flex-1 gap-2 items-center cursor-pointer'>

            <img src="assets/icons/location.svg" alt="search" className='w-5 h-5'/>
            <p className='hover:text-blue-600'>Select Location</p>
          </div>
          </li>
          <li className='hover:text-blue-500'>
            <div className='flex flex-1 gap-2 items-center font-normal text-slate-600 bg-slate-100 rounded-md p-2 w-[200px]'>

              <img src="assets/icons/search-icon.svg" alt="search" className='w-5 h-5'/>
              <input type="text" placeholder='search' className='bg-transparent outline-none border-none'/>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar