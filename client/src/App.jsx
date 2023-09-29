import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoggedInUserProvider from './context/LoggedInUserProvider'
import Layout from './pages/Layout/Layout'
import Chats from './pages/Chats/Chats'
import Auth from './pages/Auth/Auth'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LoggedInUserProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route element={<Auth />}>
                  <Route index element={<Chats />} />
                </Route>
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LoggedInUserProvider>
      </QueryClientProvider>
    </>
  )
}
