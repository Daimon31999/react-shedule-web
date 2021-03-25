import React, { useEffect } from 'react'
import '../static/tailwind.css'
import moment from 'moment'

export default function Timetable({
  timetable,
  breakIndex,
  setBreakIndex,
  playSound,
}) {
  useEffect(() => {}, [breakIndex, timetable])

  // 4 -> 04
  const formatTime = (time) => {
    time = time.split(':')
    time[0] = ('0' + time[0]).slice(-2)
    time[1] = ('0' + time[1]).slice(-2)
    return time.join(':')
  }
  const whatPairIs = (timetable) => {
    let shortFormat = 'hh:mm'
    let paraIndex = null

    let now = moment()
    timetable.map((row, index) => {
      let pairStart = moment(row[0], shortFormat)
      let pairEnd = moment(row[1], shortFormat)
      if (now.isBetween(pairStart, pairEnd)) {
        paraIndex = index
        return
      }
    })

    // if break
    if (!paraIndex) {
      for (let i = 0; i < timetable.length - 1; i++) {
        let breakStart = moment(timetable[i][1], shortFormat)
        let breakEnd = moment(timetable[i + 1][0], shortFormat)
        if (now.isBetween(breakStart, breakEnd)) {
          setBreakIndex(i + 1)
          playSound()
        }
      }
    }

    return paraIndex
  }

  let count = 0
  return (
    <div
      className='
    text-xl absolute lg:relative z-10 top-5 right-5 lg:text-2xl lg:flex lg:flex-row text-lite-blue lg:items-end'>
      <div className='flex flex-col flex-shrink-0'>
        {timetable.map((row, index) => {
          count++
          // если формат [[],[]]
          if (row[0] && row[1]) {
            return (
              <span
                key={row[0] + row[1] + index}
                className={
                  whatPairIs(timetable) === index
                    ? 'font-bold text-blue'
                    : 'font-normal'
                }>
                {index + 1}
                {') '}
                {formatTime(row[0])} — {formatTime(row[1])}
                {breakIndex - 1 === index ? (
                  <div className='font-bold text-blue text-xl relative'>
                    <span className='absolute -left-6 top-0'>→</span>
                    перемена 🥳
                  </div>
                ) : null}
              </span>
            )
          } else {
            return (
              <span className='flex' key={row[0] + row[1] + index}>
                {index}
                {') '}
                <span className='flex w-40 pl-3 overflow-hidden'>
                  <span>{'—————————————'}</span>
                </span>
              </span>
            )
          }
        })}
        {/* {!whatPairIs(timetable) ? (
          <div className="font-bold text-blue relative text-xl">
            <span className="absolute -left-6 top-0">→</span>
            <span></span>
          </div>
        ) : (
          ""
        )} */}
      </div>
    </div>
  )
}
