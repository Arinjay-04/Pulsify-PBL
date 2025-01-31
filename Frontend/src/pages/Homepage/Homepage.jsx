import React, { useState, useEffect } from 'react';
import { Card, Footer, Hero, Navbar } from '../../components';
import { facilities } from '../../constants';
import Loading from '../Loading/Loading'; // Import your Loading component

const Homepage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (for demonstration purposes)
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after timeout
    }, 1000); // Adjust the timeout duration as needed

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, []);

  return (
    <div className='bg-slate-100 h-auto'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Hero />
          <div className='flex justify-center items-center my-2 py-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-[1270px] max-lg:mx-10'>
              {facilities.map((facility) => (
                <Card data={facility} key={facility.title} />
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default Homepage;
