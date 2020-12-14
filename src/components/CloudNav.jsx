import React from 'react'
import { Link } from 'react-router-dom'

import '../static/tailwind.css'

import cloudImg from '../img/cloud.png'
import ellipseImg from '../static/assets/img/ellipse.png'

import SettingsPopup from './SettingsPopup'
import translateToRussian from '../functions/translateToRussian'

export default function CloudNav({ items, dayOfWeek, parity, group }) {
  return (
    <div className='relative ml-2 lg:ml-8'>
      <nav className='cloud w-28 lg:w-48 lg:h-48 flex flex-col items-center'>
        <img src={cloudImg} alt='' />
        <span className='absolute text-center leading-tight font-bold text-lite-white text-base lg:text-3xl mt-16 lg:mt-24'>
          {parity === 'even' ? 'Парная' : 'Непарная'}
        </span>

        <span className='week-day -mt-4 lg:-mt-6 mb-2 text-lite-blue font-bold'>
          {translateToRussian[dayOfWeek]}
        </span>
        <div className='round-items flex justify-around'>
          <Link
            to='/login'
            className='relative w-10 h-10 lg:w-12 lg:h-12 flex justify-center items-center mr-2 lg:mr-4'>
            <img
              className='absolute focus:outline-none'
              src={ellipseImg}
              alt=''
            />
            <span className='absolute uppercase cursor-pointer lg:leading-tight leading-tight text-xs lg:text-base text-center font-bold text-lite-white'>
              {group ? (
                <span>
                  {' '}
                  {group.split('-')[0]} <br /> {group.split('-')[1]}{' '}
                </span>
              ) : null}
            </span>
          </Link>
          <SettingsPopup items={items} parity={parity} />
        </div>
      </nav>
    </div>
  )
}
