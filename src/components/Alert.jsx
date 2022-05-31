import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Alert({
  type,
  heading,
  text,
  setAlert,
  alert,
  linkTo,
  position,
  cb,
}) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      typeof alert === 'boolean' &&
        alert === true &&
        cb &&
        typeof cb === 'function' &&
        cb()

      setAlert(false)
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [alert, setAlert])

  let bgColor = 'bg-yellow-200'
  let textColor = 'text-yellow-600'
  if (type) {
    switch (type) {
      case 'success':
        bgColor = 'bg-success'
        textColor = 'text-success'
        break
      case 'error':
        bgColor = 'bg-error'
        textColor = 'text-error'
        break
      default:
        bgColor = 'bg-yellow-200'
        textColor = 'text-yellow-600'
    }
  }
  return (
    <div className={`${position || 'fixed bottom-0 left-0'} w-full`}>
      <div
        className={`${
          alert ? 'flex' : 'hidden'
        } ${bgColor} ${textColor} justify-between items-center relative py-3 px-3 rounded-lg`}>
        <div>
          <span className='font-semibold'>{heading} </span>
          <span>{text} </span>
          {!linkTo ? (
            ''
          ) : (
            <Link to={`/${linkTo}`}>
              <span className='hover:text-lite-blue text-blue underline'>
                <span className='text-2xl'>{linkTo}</span>
              </span>
            </Link>
          )}
        </div>
        <div>
          <button
            type='button'
            onClick={() => {
              setAlert(false)
            }}>
            <span className='text-2xl'>&times;</span>
          </button>
        </div>
      </div>
    </div>
  )
}
