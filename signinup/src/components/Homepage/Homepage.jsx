// import React from 'react'


// const Homepage = () => {
//   return (
//     <div className='bg-slate-100 h-auto'>
//         <Navbar />
//         <Hero />
//         <div className='flex justify-center items-center my-2 py-5'>
//           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-[1270px] max-lg:mx-10'>
//             {
//               facilities.map((facility) => (
//                 <Card data={facility} key={facility.title}/>
//               ))
//             }
//           </div>
//         </div>
//         <Footer />
//     </div>
//   )
// }

// export default Homepage

// import React from 'react';
import { Card, Footer, Hero, Navbar } from '../components1';
import { facilities } from '../constants';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className='bg-slate-100 '>
        <Navbar />
        <Hero />
        <div className='flex justify-center items-center my-2 py-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto px-4'>
            {/* Adjust the max-width and max-height properties */}
            {facilities.map((facility) => (
              <div key={facility.title} className='w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px]'>
                <Card data={facility} />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;


