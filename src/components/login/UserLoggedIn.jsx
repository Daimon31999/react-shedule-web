import React from 'react'

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
}) {
  return (
    <div>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <div className={`${changeIsOpen ? 'hidden' : 'block'}`}>
            <h1 className='mb-4 text-3xl text-center'>Логин {username}</h1>
            <h1 className='mb-8 text-3xl text-center'>Группа {group}</h1>
            <button
              onClick={() => setChangeIsOpen(true)}
              className='w-full text-center py-3 rounded bg-yellow-400 text-white hover:bg-yellow-500 focus:outline-none my-1'>
              Редактировать
            </button>
          </div>
          <div className={`${changeIsOpen ? 'block' : 'hidden'}`}>
            <input
              type='text'
              className='border border-grey-light w-full p-3 rounded mb-4'
              name='login'
              placeholder='Логин'
              value={changeLogin}
              onChange={(e) => setChangeLogin(e.target.value)}
            />
            <input
              type='text'
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='group'
              placeholder='Группа'
              value={changeGroup}
              onChange={(e) => setChangeGroup(e.target.value)}
            />
            <button
              onClick={() => saveChanges()}
              className='w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-500 focus:outline-none my-1'>
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
