
import { Link } from 'react-router-dom'
import Logo from './Logo'

const Navbar = () => {
  return (
    <nav className='flex w-full shadow-md p-4 justify-center items-center bg-white max-lg:px-10'>
      <div className='flex justify-between items-center w-[1270px]'>
       
        <Logo />

        <ul className='flex flex-1 justify-end gap-6 items-center text-sm font-bold text-slate-500 max-md:hidden'>
          <li>
            <Link to={`/about`}>About</Link>
          </li>
          <li>
            <Link to={`/contact`}>Contact</Link>
          </li>
          <li>
          <button type='submit' className='b1' style={{color: '#1E90FF'}}  > <Link to = {'/login'}>Login</Link></button>

          </li>
          <li>
            <div className='flex flex-1 gap-2 items-center font-normal text-slate-600 bg-slate-100 rounded-md p-2 w-[200px]'>

              <img src="Assets/icons/search-icon.svg" alt="search" className='w-5 h-5'/>
              <input type="text" placeholder='search' className='bg-transparent outline-none border-none'/>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar


{/* <div className='flex flex-1 gap-2 items-center cursor-pointer' style={{ backgroundColor: 'black', color: 'white', width: '2px', height: '2px' }}>

<p>Login</p>
</div> */}

