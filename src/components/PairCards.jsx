import React from 'react'
import '../css/DayCard.module.css'

export default function PairCards({ day, setData, data }) {
  const handleChange = (event) => {
    let tmpData = Object.assign({}, data)
    let [row, cell] = event.target.name.split('')
    tmpData.timetable[row][cell] = event.target.value
    setData(tmpData)
  }

  const handleDeleteLesson = (event) => {
    let tmpData = Object.assign({}, data)
    let [row, cell] = event.target.name.split('')
    console.log(cell) // for ignoring warning

    if (tmpData.timetable.length > 1) {
      tmpData.timetable.splice(row, 1)
    }
    setData(tmpData)
  }

  const handleAddLesson = (event) => {
    let tmpData = Object.assign({}, data)

    tmpData.timetable.push(['', ''])
    setData(tmpData)
  }

  const mapItems = () => {
    const arr = []
    data.timetable.map((row, index) => {
      arr.push(
        <tr
          key={index}
          className='h-14 bg-admin-blue-lite text-center text-admin-blue font-bold text-xl capitalize'>
          <td className='px-1 lg:px-10'>{index + 1}</td>
          <td className='px-1 lg:px-10'>
            <input
              size='3'
              className='px-1 lg:px-10 text-center outline-none bg-admin-blue-lite font-bold h-12 focus:bg-white focus:text-black'
              type='text'
              value={row[0]}
              onChange={handleChange}
              name={`${index}0`}
            />
          </td>
          <td className='w-100'>
            <input
              size='3'
              className='px-1 lg:px-10 text-center outline-none bg-admin-blue-lite font-bold h-12 focus:bg-white focus:text-black'
              type='text'
              value={row[1]}
              onChange={handleChange}
              name={`${index}1`}
            />
          </td>
          <td className='border-none bg-red-400'>
            <input
              size='3'
              type='submit'
              name={index}
              onClick={handleDeleteLesson}
              className='px-2 lg:px-4 py-3 bg-red-400 text-white'
              value='-'
            />
          </td>
          {index === data.timetable.length - 1 ? (
            <td className='border-none bg-blue-400'>
              <input
                size='3'
                type='submit'
                name={index}
                onClick={handleAddLesson}
                className='px-2 lg:px-4 py-3 bg-blue-400 text-white'
                value='+'
              />
            </td>
          ) : null}
        </tr>
      )
      return null
    })
    return arr
  }
  return (
    <div>
      <table className='w-auto lg:mx-28 border-separate'>
        <tbody>
          <tr className='h-14 bg-admin-blue-lite text-black font-bold mx-20 px-1 lg:px-10 text-xl capitalize'>
            <th className='px-1 lg:px-10'>пара</th>
            <th className='px-1 lg:px-10'>начало</th>
            <th className='px-1 lg:px-10'>конец</th>
          </tr>
          {mapItems()}
        </tbody>
      </table>
    </div>
  )
}
