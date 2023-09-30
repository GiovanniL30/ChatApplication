import React from 'react'
import './chats.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Conversation from '../../components/Conversation/Conversation'

export default function Chats() {
  return (
    <>
      <div className='chats-container'>
        <Sidebar />
        <Conversation />
      </div>
    </>
  )
}
