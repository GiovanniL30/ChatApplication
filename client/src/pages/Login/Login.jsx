import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getUsers } from '../../../api'
import { useUser } from '../../context/LoggedInUserProvider'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Login() {
  const { setUser } = useUser()
  const [haveError, setHaveError] = useState(false)
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  })

  const navigate = useNavigate()

  function onChange(event) {
    const { name, value } = event.target

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  const getUsersQuery = useQuery(['users'], getUsers)

  function onSubmit(e) {
    e.preventDefault()

    if (formData.password === '' || formData.userName === '') {
      setHaveError(true)
      return
    }

    const users = getUsersQuery.data

    const user = users.find((user) => user.userName === formData.userName)

    if (user && user.password === formData.password) {
      setUser(user)
      return navigate('/')
    }

    alert('wrong password or username')
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={onSubmit}>
          <div className='title'>Login </div>

          <div className='field'>
            <div className='label'>Username: </div>
            <input
              type='text'
              name='userName'
              value={formData.userName}
              onChange={onChange}
            />
          </div>
          <div className='field'>
            <div className='label'>Password: </div>
            <input
              type='text'
              name='password'
              value={formData.password}
              onChange={onChange}
            />
          </div>
          <button>Login</button>
          {haveError && (
            <div className='pre-text error-text'>Please Answer all fields</div>
          )}
        </form>
      </div>
    </>
  )
}
