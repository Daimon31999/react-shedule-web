import React, { useState, useEffect } from 'react'
import settingsImg from '../static/assets/img/settings.png'
import calendar_even from './../img/calendar_even.png'
import calendar_odd from './../img/calendar_odd.png'
import clock from './../img/clock.png'
import { Link } from 'react-router-dom'

export default function SettingsPopup({ items, parity }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [isOpen])

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div
        className='w-10 h-10 lg:w-12 lg:h-12 mt-4 relative bg-cover cursor-pointer'
        onClick={toggle}
        style={{
          backgroundImage: `url(${settingsImg})`,
        }}>
        {/* <div
          id="settings-modal"
          className={`${isOpen ? "block" : "hidden"}
          absolute left-14 top-0 w-40 h-20 bg-front-blue rounded-2xl 
          px-4 py-2 flex flex-row justify-center items-center`}
        > */}
        <div
          className={`${isOpen ? 'block' : 'hidden'}
          settings-modal
          absolute lg:left-14 lg:top-0 -left-14 top-12
          w-40 h-20 bg-front-blue rounded-2xl
          px-4 py-2 flex flex-row justify-center items-center`}>
          <Link to={{ pathname: '/calendar', state: { parity: 'even' } }}>
            <img
              className='hover-img-invert w-10 h-10 mr-3'
              src={calendar_even}
              alt=''
            />
          </Link>

          <Link to={{ pathname: '/calendar', state: { parity: 'odd' } }}>
            <img
              className='hover-img-invert w-10 h-10 mr-3'
              src={calendar_odd}
              alt=''
            />
          </Link>

          <br />
          <Link to={{ pathname: '/time', state: { parity } }}>
            <img className='hover-img-invert w-10 h-10' src={clock} alt='' />
          </Link>
        </div>
      </div>
    </div>
  )
}
