import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div>
      <div className='w-10 h-4 rounded bg-green-400 flex items-center justify-center'>
        <Link to='/'>Home</Link>
      </div>
      <h1 className='text-red-400 text-2xl text-bold'>404 not Found</h1>
    </div>
  )
}
