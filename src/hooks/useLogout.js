import { useEffect, useState } from 'react'
import { auth, db } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch, user } = useAuthContext()
  
  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      //update online status
    //   const { uid } = user
    //   await collection(db,'users').doc(uid).update({online: false})

      // sign the user out
      const res = await signOut(auth)
      console.log('signed out')

      
      // dispatch logout action
        dispatch({ type: 'LOGOUT' })
        

      //update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      } 

      
    } 
    catch(err) {
        setError(err.message)
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}