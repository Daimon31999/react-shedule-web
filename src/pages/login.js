import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import Axios from 'axios'
import LoginRegisterHeader from './../components/LoginRegisterHeader'
import UserLoggedIn from '../components/login/UserLoggedIn'
import UserNotLoggedIn from '../components/login/UserNotLoggedIn'
import Alert from './../components/Alert'
import CircleLoader from 'react-spinners/CircleLoader'
import '../static/tailwind.css'
import '../css/App.css'

export default function Login() {
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [changeGroup, setChangeGroup] = useState('')
  const [changeLogin, setChangeLogin] = useState('')
  const [changeIsOpen, setChangeIsOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const [alert, setAlert] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [userAlreadyExistsError, setUserAlreadyExistsError] = useState(false)

  const [data, setData] = useState(null)

  const login = () => {
    Axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_SERVER_URL}/login`,
    })
      .then((res) => {
        getUser()
        let str = window.location.href
        let splitted = str.split('login').join('')
        window.location.href = splitted
      })
      .catch((err) => {
        setLoginError(true)
      })
  }
  const logout = () => {
    Axios.request({
      url: `${process.env.REACT_APP_BASE_SERVER_URL}/logout`,
      method: 'get',
      withCredentials: true,
      headers: {
        Cookie: 'connect.sid=0;',
      },
    })
      .then(function (response) {
        // handle success
        // document.cookie = 'connect.sid=hello'
        setData(null)
        setIsLoaded(true)
      })
      .catch(function (error) {
        // handle error
        console.log('error', error)
      })
  }
  const getUser = () => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_SERVER_URL}/user`,
    })
      .then((res) => {
        console.log('user', res.data)
        setData(res.data)
        setIsLoaded(true)
      })
      .catch((err) => {
        setLoginError(true)
      })
  }

  const saveChanges = () => {
    Axios({
      method: 'PUT',
      data: {
        username: changeLogin,
        group: changeGroup,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_SERVER_URL}/changeuser`,
    })
      .then((res) => {
        setChangeIsOpen(false)
        setAlert(true)
        getUser()
      })
      .catch((err) => setUserAlreadyExistsError(true))
  }

  useEffect(() => {
    getUser()
  }, [])
  useEffect(() => {
    if (data) {
      setChangeLogin(data.username)
      setChangeGroup(data.group)
    }
  }, [data])

  if (!isLoaded) {
    const override = `
  display: block;
  margin: 0 auto;
  margin-top: 40vh;
`
    return (
      <CircleLoader
        css={override}
        size={150}
        color={'#1EA7C6'}
        loading={!isLoaded}
      />
    )
  } else {
    return (
      <>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Login</title>
        </Helmet>
        <div className='App'>
          <div>
            <div className='bg-grey-lighter min-h-screen flex flex-col'>
              <LoginRegisterHeader />
              <Alert
                alert={alert}
                setAlert={setAlert}
                heading='Успешно сохраннено!'
                type='success'
                text={`Новый логин «${changeLogin}» новая группа «${changeGroup}»`}
              />
              <Alert
                alert={loginError}
                setAlert={setLoginError}
                heading='Ошибка!'
                type='error'
                text={`Неверный логин или пароль`}
              />
              <div>
                {data ? (
                  <UserLoggedIn
                    logout={logout}
                    saveChanges={saveChanges}
                    username={data.username}
                    group={data.group}
                    changeGroup={changeGroup}
                    setChangeGroup={setChangeGroup}
                    changeLogin={changeLogin}
                    setChangeLogin={setChangeLogin}
                    changeIsOpen={changeIsOpen}
                    setChangeIsOpen={setChangeIsOpen}
                    userAlreadyExistsError={userAlreadyExistsError}
                    setUserAlreadyExistsError={setUserAlreadyExistsError}
                  />
                ) : (
                  <UserNotLoggedIn
                    setLoginPassword={setLoginPassword}
                    loginPassword={loginPassword}
                    setLoginUsername={setLoginUsername}
                    loginUsername={loginUsername}
                    login={login}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
