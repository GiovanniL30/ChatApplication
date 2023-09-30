import React, { useState } from 'react'
import './conversation.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { addNewMessage, getConversation, getUser } from '../../../api'
import { useUser } from '../../context/LoggedInUserProvider'

export default function Conversation() {
  const [newMessage, setNewMessage] = useState('')
  const queryClient = useQueryClient()
  const { user } = useUser()

  const userID = user.id

  const [params, setParams] = useSearchParams()

  const conversationID = params.get('conversation')

  const getConversationQuery = useQuery({
    queryKey: ['conversation', conversationID],
    queryFn: () => getConversation(conversationID),
  })

  const getUserQuery = useQuery({
    queryKey: ['user', getConversationQuery?.data?.receiver],
    enabled: getConversationQuery?.data?.receiver != null,
    queryFn: () => getUser(getConversationQuery.data.receiver),
  })

  const newMessageQuery = useMutation({
    mutationKey: ['newMessage'],
    mutationFn: (newMessageOBJ) =>
      addNewMessage({ newMessageOBJ, conversationID }),
    onSuccess: () => {
      queryClient.invalidateQueries(['conversation', conversationID])
      setNewMessage('')
    },
  })

  function addMessage() {
    const newMessageOBJ = {
      ...getConversationQuery.data,
      messages: [
        ...getConversationQuery.data.messages,
        {
          sender: userID,
          message: newMessage,
        },
      ],
    }

    newMessageQuery.mutate(newMessageOBJ)
  }

  if (getConversationQuery.isLoading || getUserQuery.isLoading)
    return <h1>Loading...</h1>

  const conversation = getConversationQuery.data

  const messagesMap = conversation.messages.map((conversation, index) => {
    const fromME = conversation.sender === userID
    return (
      <div className={`message-block ${fromME ? 'from-me' : ''}`} key={index}>
        {conversation.message}
      </div>
    )
  })

  return (
    <div className='conversation-container'>
      <div className='conversation-receiver'>
        <p>{getUserQuery.data.userName}</p>
      </div>
      <div className='conversation-messages'>{messagesMap}</div>
      <div className='new-message'>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Type a message'
          type='text'
          name='newMessage'
        />
        {newMessage.length !== 0 && <button onClick={addMessage}>Send</button>}
      </div>
    </div>
  )
}
