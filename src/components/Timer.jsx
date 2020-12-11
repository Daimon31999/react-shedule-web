import React, { useState, useEffect } from 'react'
import '../static/tailwind.css'
import useInterval from './../hooks/useInterval'
import moment from 'moment'
import ReactTooltip from 'react-tooltip'

export default function Timer({
  timetable,
  items,
  dayOfWeek,
  breakIndex,
  parity,
}) {
  const [resultTime, setResultTime] = useState()
  const [pair, setPair] = useState(null)

  useEffect(() => {
    repeatingFunc()
  }, [])

  // TODO убрать повторение (в DayCard)
  const getAbbreviation = (sentence) => {
    if (sentence) {
      let result
      sentence = sentence.split(' ')
      result = sentence.map((word) => word[0])
      result = result.join('').toUpperCase()
      return result
    }
  }

  const print = () => {
    // Формальные Языки Программирования
    if (pair) {
      // ФЯП
      return getAbbreviation(pair)
    }

    // '' | undefined
    else if (breakIndex) {
      return (
        <div className='text-4xl flex items-start'>
          <span>Перемена </span>{' '}
          <span role='img' aria-label='happy' className='ml-2'>
            🥳
          </span>
        </div>
      )
    }
    // '' | undefined
    else {
      return (
        <span className='text-4xl flex items-start'>
          <span>Иди домой</span>{' '}
          <span role='img' aria-label='happy'>
            🤟🥳
          </span>
        </span>
      )
    }
  }

  const repeatingFunc = () => {
    const whatPairIs = (timetable) => {
      let shortFormat = 'hh:mm'
      let pairIndex

      let now = moment()
      timetable.map((row, index) => {
        let pairStart = moment(row[0], shortFormat)
        let pairEnd = moment(row[1], shortFormat)
        if (now.isBetween(pairStart, pairEnd)) {
          pairIndex = index
          return
        }
      })
      return pairIndex
    }

    let pairIndex = whatPairIs(timetable)
    let currentPairTime = timetable[pairIndex]
    if (currentPairTime) {
      let shortFormat = 'hh:mm'
      let secondsRemaining = moment
        .duration(moment(currentPairTime[1], shortFormat).diff(moment()))
        .asSeconds()
      const result = moment.utc(secondsRemaining * 1000).format('HH:mm:ss')
      setResultTime(result)
      let index = pairIndex
      let pairName
      if (dayOfWeek === 'воскресение') {
        pairName = ': )'
      } else pairName = items.shedule[parity][dayOfWeek][index]
      setPair(pairName)
    }
  }

  useInterval(repeatingFunc, 1000)

  return (
    <div
      className='
    text-5xl items-center lg:items-stretch mt-10 lg:-mt-16 lg:items
    lg:text-6xl font-bold text-blue flex flex-col lg:justify-end '>
      <div className='flex items-center lg:justify-between'>
        <span>{print()}</span>
        <a data-tip data-for='my_info' data-event='click focus'>
          <svg
            height='40'
            width='40'
            className={`${pair ? '' : 'hidden'} ml-2 z-50 cursor-pointer`}>
            <circle cx='20' cy='20' r='20' fill='#017383' />
            <text
              x='11'
              y='31'
              fontFamily='Verdana'
              fontSize='30'
              fill='#DDEAEA'>
              ?
            </text>
          </svg>
        </a>

        <ReactTooltip
          id='my_info'
          place='top'
          // clickable='true'
          type='info'
          effect='solid'
          textColor='#fff'
          backgroundColor='#017383'>
          <span>{pair}</span>
        </ReactTooltip>
      </div>

      <span>{pair && resultTime}</span>
    </div>
  )
}
