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
      

      //file upload
    //   const uploadFile = file => {
    //     if(!file) throw new Error('No file provided')

    //     const storageRef = ref(storage,`/avatars/${file.name}`)
    //     const uploadTask = uploadBytesResumable(storageRef, file)

    //     uploadTask.on("state_changed", (snapshot) => {
    //         const prog = Math.round(( snapshot.bytesTransferred / snapshot.totalBytes) * 100) 
    //         setProgress(prog)
    //     }, ( err ) => {
    //         setError(err)
    //     }, () => {
    //         getDownloadURL(uploadTask.snapshot.ref)
    //     })
        
    //   }

    //   const avatar = uploadFile(thumbnail)
    //   console.log('avatar', avatar)



      // upload user thumbnail
    //   const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
    //   const img = await ref(storage, uploadPath).put(thumbnail)
    //   const imgUrl = await getDownloadURL(img.ref)
    //   console.log('url', imgUrl)


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


      // upload user thumbnail
    //   const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
    //   const img = await projectStorage.ref(uploadPath).put(thumbnail)
    //   const imgUrl = await img.ref.getDownloadURL()

      

      // add display AND PHOTO_URL name to user
    //   await res.user.updateProfile({ displayName, photoURL: imgUrl })

      // create user document
    //   await projectFirestore.collection('users').doc(res.user.uid).set({
    //     online: true,
    //     displayName,
    //     photoURL: imgUrl
    //   })

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

  return { signup, error, isPending }
}