import React, { useState, useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

import Timer from '../components/Timer'
import Timetable from '../components/Timetable'
import CloudNav from '../components/CloudNav'

import sunImg from './../img/sun.png'
import '../static/tailwind.css'
import '../css/App.css'
import Axios from 'axios'

export default function Home() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [breakIndex, setBreakIndex] = useState(null)

  const getDayOfWeek = () => {
    let days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ]
    let todayIndex = new Date().getDay()
    return days[todayIndex]
  }

  const parity = () => {
    var d0 = new Date().getTime(),
      d = new Date(new Date().getFullYear(), 0, 1),
      d1 = d.getTime(),
      dd = d.getDay(),
      re = Math.floor((d0 - d1) / 8.64e7) + (dd ? dd - 1 : 6)
    let result
    Math.floor(re / 7) % 2 ? (result = 'odd') : (result = 'even')
    return result
  }

  useEffect(() => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_SERVER_URL}/user`,
    }).then((res) => {
      setItems(res.data)
      setIsLoaded(true)
    })
  }, [])

  if (error) {
    setError(true)
    return <div>Ошибка: {error.message}</div>
  } else if (!isLoaded) {
    const override = `
  display: block;
  margin: 0 auto;
  margin-top: 40vh;
`
    return (
      <ClipLoader
        css={override}
        size={150}
        color={'#1EA7C6'}
        loading={!isLoaded}
      />
    )
  } else if (items) {
    let timetable = items.timetable.slice(0)
    return (
      <div id='index-wrapper'>
        <div id='index'>
          <div
            className='main-container
        w-full
        flex flex-col lg:flex-row gap-40 flex-shrink-0
        '>
            <CloudNav
              items={items}
              dayOfWeek={getDayOfWeek()}
              parity={parity()}
              group={items.group}
            />
            <Timer
              items={items}
              timetable={timetable}
              dayOfWeek={getDayOfWeek()}
              breakIndex={breakIndex}
              setBreakIndex={setBreakIndex}
              parity={parity()}
            />
            <Timetable
              timetable={timetable}
              breakIndex={breakIndex}
              setBreakIndex={setBreakIndex}
            />

            <img
              className='sun hidden z-0 lg:block absolute top-0 right-0 lg:w-64 lg:h-64'
              src={sunImg}
              alt='sun'
            />
          </div>
        </div>
      </div>
    )
  } else {
    let str = window.location.href
    let loginUrl = str + 'login'
    window.location.href = loginUrl
    return <div>Redirect to Login</div>
  }
}
