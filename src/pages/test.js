import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Test() {
  useEffect(() => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_SERVER_URL}/changeuser`,
        { group: 'TI-999' },
        {
          withCredentials: true,
        }
      )
      .then((r) => console.log(r.data))
      .catch((e) => console.log(e))
  }, [])

  return (
    <div>
      <Link to='/login'>
        <h2>Login</h2>
      </Link>
    </div>
  )
}
