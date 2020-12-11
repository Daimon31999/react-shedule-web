import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import ClockLoader from 'react-spinners/ClockLoader'

import PairCards from '../components/PairCards'
import SaveButton from '../components/SaveButton'
import Alert from './../components/Alert'

import homeImg from '../img/home.png'
import backImg from '../img/back.png'
import calendar_even from './../img/calendar_even.png'
import calendar_odd from './../img/calendar_odd.png'

export default function TimeAdmin({ location }) {
  const [items, setItems] = useState()
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_SERVER_URL}/user`,
    }).then((res) => {
      setItems(res.data)
      setLoading(false)
    })
  }, [])

  if (items && location.state) {
    const group = items.group

    const save = async () => {
      Axios.put(`${process.env.REACT_APP_BASE_SERVER_URL}/timetable`, items, {
        withCredentials: true,
      })
        .then((r) => {
          setAlert(true)
        })
        .catch((e) => console.log(e))
    }
    return (
      <div>
        <h1 className='w-full pt-4 px-4 h-24 lg:h-24 bg-admin-blue capitalize font-medium text-2xl lg:text-4xl flex items-center text-white'>
          <span className='lg:ml-16'>
            Время <span className='uppercase'>{group}</span>{' '}
          </span>
        </h1>
        <Alert
          alert={alert}
          setAlert={setAlert}
          heading='Успешно сохраннено!'
          type='success'
          text={``}
          position='fixed bottom-12 left-0'
        />
        <div className='flex px-4 bg-admin-blue py-1 pb-3 lg:py-4 items-center'>
          <Link
            to='/'
            className='flex hover-img-invert flex-row items-center lg:w-24 '>
            <img className='mr-1 mt-1 w-6 h-6' src={backImg} alt='back' />
            <img
              id='home'
              className='w-8 h-8 lg:w-10 lg:h-10 mr-3'
              src={homeImg}
              alt='home'
            />
          </Link>
          <Link to={{ pathname: '/calendar', state: { parity: 'even' } }}>
            <img
              className='hover-img-invert w-8 h-8 lg:w-10 lg:h-10 mr-1'
              src={calendar_even}
              alt='calendar-even'
            />
          </Link>

          <Link to={{ pathname: '/calendar', state: { parity: 'odd' } }}>
            <img
              className='hover-img-invert w-8 h-8 lg:w-10 lg:h-10'
              src={calendar_odd}
              alt='calendar-odd'
            />
          </Link>
        </div>

        <div className='wrapper mt-4 mb-20 lg:my-20'>
          <PairCards data={items} setData={setItems} />
        </div>
        <SaveButton save={save} />
      </div>
    )
  } else {
    const override = `
  display: block;
  margin: 0 auto;
  margin-top: 40vh;
`
    return (
      <ClockLoader
        css={override}
        size={150}
        color={'#017383'}
        loading={loading}
      />
    )
  }
}
