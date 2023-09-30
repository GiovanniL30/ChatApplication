import React from 'react'
import './sidebar.css'
import { useUser } from '../../context/LoggedInUserProvider'
import Chathead from '../Chathead/Chathead'

export default function Sidebar() {
  const { user } = useUser()

  const chatheadElements = user.conversations.map((id) => {
    return <Chathead key={id} id={id} />
  })

  return (
    <>
      <div className='sidebar-container'>
        <div className='filters'>
          <div className='all-chats'>ALL CHATS</div>
        </div>
        <div className='chatheaders'>{chatheadElements}</div>
      </div>
    </>
  )
}
