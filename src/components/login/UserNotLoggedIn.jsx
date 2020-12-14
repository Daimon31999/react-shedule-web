import React from 'react'
import { Link } from 'react-router-dom'

export default function UserNotLoggedIn({
  setLoginPassword,
  loginPassword,
  setLoginUsername,
  loginUsername,
  login,
}) {
  return (
    <div>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Вход</h1>
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='login'
            placeholder='Логин'
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='password'
            placeholder='Пароль'
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          <button
            onClick={login}
            type='submit'
            className='w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-800 focus:outline-none focus:bg-green-800 my-1'>
            Войти
          </button>
        </div>

        <div className='text-grey-dark mt-6'>
          Нет аккаунта?{' '}
          <Link to='/register' className='text-blue border-b border-admin-blue'>
            Регистрация
          </Link>
          .
        </div>
      </div>
    </div>
  )
}
