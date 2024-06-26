import React, { createContext, useContext, useEffect, useState } from 'react'

const LoggedInUserContext = createContext()

export function useUser() {
  return useContext(LoggedInUserContext)
}

export default function LoggedInUserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('logged-in')
    return storedUser ? JSON.parse(storedUser) : null
  })

  useEffect(() => {
    sessionStorage.setItem('logged-in', JSON.stringify(user))
  }, [user])

  return (
    <LoggedInUserContext.Provider value={{ user, setUser }}>
      {children}
    </LoggedInUserContext.Provider>
  )
}
