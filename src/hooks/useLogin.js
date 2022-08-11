import { useState, useEffect } from 'react'
import { auth, db } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)   
  const { dispatch } = useAuthContext()
  

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)
  
    try {
      // login
      const res = await signInWithEmailAndPassword(auth, email, password)
      console.log('user logged in', res.user)
      //update online status
    //   await projectFirestore.collection('users').doc(res.user.uid).update({online: true})

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }

    setError(err.message)
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, isPending, error }
}