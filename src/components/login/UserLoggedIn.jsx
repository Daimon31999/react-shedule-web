import React, { useState } from 'react'
import Alert from '../Alert'

export default function UserLoggedIn({
  username,
  logout,
  saveChanges,
  group,
  changeGroup,
  setChangeGroup,
  changeLogin,
  setChangeLogin,
  changeIsOpen,
  setChangeIsOpen,
  userAlreadyExistsError,
  setUserAlreadyExistsError,
}) {
  const [validationPassed, setValidationPassed] = useState(true)

  const validateManyFields = (arr) => {
    if (Array.isArray(arr)) {
      let isOk = arr.every((str) => str && str.length > 3)
      setValidationPassed(isOk)
    }
  }

  const validate = (data) => {
    if (typeof data === 'string') {
      if (data && data.length > 3) return true
      else return false
    }
  }

  return (
    <div>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <Alert
            alert={userAlreadyExistsError}
            setAlert={setUserAlreadyExistsError}
            heading='Ошибка!'
            type='error'
            text={`Пользователь с именем «${changeLogin}» уже существует`}
          />

          <div className={`${changeIsOpen ? 'hidden' : 'block'}`}>
            <h1 className='mb-4 text-3xl text-center'>Логин {username}</h1>
            <h1 className='mb-8 text-3xl text-center'>
              Группа {group.toUpperCase()}
            </h1>
            <button
              onClick={() => setChangeIsOpen(true)}
              className='w-full text-center py-3 rounded bg-yellow-400 text-white hover:bg-yellow-500 focus:outline-none my-1'>
              Редактировать
            </button>
          </div>
          <div className={`${changeIsOpen ? 'block' : 'hidden'}`}>
            <input
              type='text'
              className={
                'border w-full p-3 rounded mb-4 ' +
                (validate(changeLogin) ? 'border-grey-light' : 'border-red-500')
              }
              name='login'
              placeholder='Логин'
              value={changeLogin}
              required
              onChange={(e) => {
                setChangeLogin(e.target.value)
                validateManyFields([e.target.value, changeGroup])
              }}
            />
            <input
              type='text'
              className={
                'block border w-full p-3 rounded mb-4 uppercase ' +
                (validate(changeGroup) ? 'border-grey-light' : 'border-red-500')
              }
              name='group'
              placeholder='Группа'
              value={changeGroup}
              required
              onChange={(e) => {
                setChangeGroup(e.target.value)
                validateManyFields([changeLogin, e.target.value])
              }}
            />
            <button
              onClick={() => validationPassed && saveChanges()}
              className={
                (validationPassed
                  ? 'hover:bg-green-500 bg-green-400'
                  : 'bg-green-200 cursor-default') +
                ' w-full text-center py-3 rounded text-white  focus:outline-none my-1'
              }>
              Сохранить
            </button>
            <button
              onClick={() => setChangeIsOpen(false)}
              className='w-full text-center py-3 rounded bg-gray-400 text-white hover:bg-gray-500 focus:outline-none my-1'>
              Отмена
            </button>
          </div>
          <button
            onClick={logout}
            type='submit'
            className='w-full text-center py-3 rounded bg-red-500 text-white hover:bg-red-800 focus:outline-none my-1'>
            Выход
          </button>
        </div>
      </div>
    </div>
  )
}
