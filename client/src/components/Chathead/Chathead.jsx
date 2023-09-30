import React from 'react'
import './chathead.css'
import { useQuery } from '@tanstack/react-query'
import { getConversation, getUser } from '../../../api'
import { useSearchParams } from 'react-router-dom'
import { useUser } from '../../context/LoggedInUserProvider'

export default function Chathead({ id }) {
  const [params, setParams] = useSearchParams()

  const getConversationQuery = useQuery({
    queryKey: ['conversation', id],
    queryFn: () => getConversation(id),
  })

  const getUserQuesry = useQuery({
    queryKey: ['user', getConversationQuery?.data?.receiver],
    enabled: getConversationQuery?.data?.receiver != null,
    queryFn: () => getUser(getConversationQuery.data.receiver),
  })

  function openCoversation(key, value) {
    setParams((prev) => {
      if (value === null) {
        prev.delete(key)
      } else {
        prev.set(key, value)
      }

      return prev
    })
  }

  if (getUserQuesry.isLoading) return <h1>Loading....</h1>

  return (
    <>
      <div
        onClick={() =>
          openCoversation('conversation', getConversationQuery.data.id)
        }
        className={`chathead-container ${
          params.get('conversation') === getConversationQuery.data.id
            ? 'active-conversation'
            : ''
        }`}
      >
        <img src={getUserQuesry.data.image} alt='' />
        <div className='chathead-information'>
          <div>{getUserQuesry.data.userName}</div>
          <div>ascac</div>
        </div>
      </div>
    </>
  )
}
