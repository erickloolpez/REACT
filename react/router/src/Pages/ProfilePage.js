import React from 'react'
import { useAuth } from '../Utils/auth'

function ProfilePage() {
  const auth = useAuth()
  return (
    <>
      <h1>Perfil</h1>
      <p>Welcome , {auth.user.username}</p>
    </>
  )
}

export { ProfilePage }