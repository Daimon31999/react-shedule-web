import React, { useState } from 'react'
import { Helmet } from 'react-helmet'

import { Link, useHistory } from 'react-router-dom'
import LoginRegisterHeader from './../components/LoginRegisterHeader'
import Alert from './../components/Alert'

import '../static/tailwind.css'
import '../css/App.css'
import Axios from 'axios'

export default function Register() {
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerGroup, setRegisterGroup] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const history = useHistory()

  const register = () => {
    Axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword,
        group: registerGroup,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_SERVER_URL}/register`,
    })
      .then(() => setSuccess(true))
      .catch((res) => {
        setError(true)
        console.log(res)
      })
  }
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Register</title>
      </Helmet>
      <div className='App'>
        <div>
          <div className='bg-grey-lighter min-h-screen flex flex-col'>
            <LoginRegisterHeader />

            <Alert
              alert={error}
              setAlert={setError}
              heading='Ошибка!'
              type='error'
              text={`Пользователь с именем «${registerUsername}» уже существует`}
            />

            <Alert
              alert={success}
              setAlert={setSuccess}
              heading='Success'
              type='success'
              text='Пользователь успешно создан'
              cb={() => history.push('/login')}
            />

            <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
              <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
                <h1 className='mb-8 text-3xl text-center'>Регистрация</h1>
                <input
                  type='text'
                  className='block border border-grey-light w-full p-3 rounded mb-4'
                  name='login'
                  required
                  placeholder='Логин'
                  onChange={(e) => setRegisterUsername(e.target.value)}
                />
                <input
                  type='password'
                  className='block border border-grey-light w-full p-3 rounded mb-4'
                  name='password'
                  required
                  placeholder='Пароль'
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <input
                  type='text'
                  className='block border border-grey-light w-full p-3 rounded mb-4'
                  name='group'
                  required
                  placeholder='Группа'
                  onChange={(e) => setRegisterGroup(e.target.value)}
                />
                <button
                  onClick={register}
                  type='submit'
                  className='w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-800 focus:outline-none my-1'>
                  Зарегистрироваться
                </button>
              </div>
              <div className='text-grey-dark mt-6'>
                Уже есть аккаунт?{' '}
                <Link to='/login'>
                  <span className='text-blue border-b border-admin-blue'>
                    Войти.
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
