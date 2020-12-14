import React from 'react'
import { Link } from 'react-router-dom'
import homeImg from '../img/home.png'
import backImg from '../img/back.png'

export default function LoginRegisterHeader() {
  return (
    <div className='bg-admin-blue w-full h-14 lg:h-24 flex items-center'>
      <Link
        to='/'
        className='flex hover-img-invert flex-row items-center lg:w-24 '>
        <img className='mr-1 mt-1 w-6 h-6' src={backImg} alt='back-arrow'></img>
        <img
          id='home'
          className='w-8 h-8 lg:w-10 lg:h-10 mr-3'
          src={homeImg}
          alt='home'
        />
      </Link>
    </div>
  )
}
