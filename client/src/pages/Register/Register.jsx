import React, { useState } from 'react'
import './register.css'
import { createUser } from '../../../api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { NavLink, Navigate } from 'react-router-dom'

export default function Register() {
  const query = useQueryClient()

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    gender: '',
  })

  const [createdAccount, setCreatedAccount] = useState(false)
  const [haveError, setHaveError] = useState(false)

  function onChange(event) {
    const { name, value } = event.target

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  const createUserMutation = useMutation({
    mutationFn: () => createUser(formData),
    onSuccess: () => {
      query.invalidateQueries('users')
      setHaveError(false)
      setCreatedAccount(true)
      setFormData({
        userName: '',
        password: '',
        gender: '',
      })
    },
  })

  function onSubmit(e) {
    e.preventDefault()

    if (
      formData.gender === '' ||
      formData.password === '' ||
      formData.userName === ''
    ) {
      setHaveError(true)
      return
    }

    createUserMutation.mutateAsync()
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={onSubmit}>
          <div className='title'>Create Account</div>

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

          <div className='gender-selection'>
            <div>Gender:</div>
            <div>
              <div className='field'>
                <input
                  type='radio'
                  name='gender'
                  value='Male'
                  onChange={onChange}
                />
                <div className='label'>Male </div>
              </div>
              <div className='field'>
                <input
                  type='radio'
                  name='gender'
                  value='Female'
                  onChange={onChange}
                />
                <div className='label'>Female </div>
              </div>
            </div>
          </div>

          <button disabled={createUserMutation.isLoading}>
            {createUserMutation.isLoading ? 'Creating User' : 'Register'}
          </button>

          {haveError && (
            <div className='pre-text error-text'>Please Answer all fields</div>
          )}
          {createdAccount && (
            <div className='pre-text success-text'>
              Sucessfully created account <NavLink to='/login'>Login</NavLink>
            </div>
          )}
        </form>
      </div>
    </>
  )
}
