import { useState, useEffect } from 'react'
import { auth, db, storage} from '../firebase/config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { useAuthContext } from './useAuthContext'
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'



export const useSignup = () => {
  const [progress, setProgress] = useState(0)
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log('user', res.user)
      if (!res) {
        throw new Error('Could not complete signup')
      }
      

      const imageRef = ref(storage, `thumbnails/${res.user.uid}/${thumbnail.name}`)
      const uploadedFile = await uploadBytes(imageRef,thumbnail)
      const imgUrl = await getDownloadURL(imageRef)
     
      //store user in the db
      const reference = collection(db, 'users')
      await addDoc(reference, {
        email, password, displayName, photoURL: imgUrl
      })

      //update auth user 
      await updateProfile(res.user,{ displayName, photoURL: imgUrl})

      console.log('user', res.user)


     

      //dispatch login action
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
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending, setIsPending }
}