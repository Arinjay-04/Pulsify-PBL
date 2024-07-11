import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div className="nav-logo text-3xl font-bold text-blue-400 tracking-wide drop-shadow-md">
      <Link to={'/'}>
        Pulsiefy
        </Link>
    </div>
  )
}

export default Logo