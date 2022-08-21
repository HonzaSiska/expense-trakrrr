import { useReducer, useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore'
import { useAuthContext } from './useAuthContext'

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
      case "IS_PENDING":
        return {success: false, isPending: true, error: null, document: null}
      case "ERROR":
        return {success: false, isPending: false, error: action.payload, document: null}
      case "ADDED_DOCUMENT":
        return {success: true, isPending: false, error: null, document: action.payload}
        case "DELETED_DOCUMENT":
          return {success: true, isPending: false, error: null, document: null}
      default:
        return state
    }
}

export const useFirestore = (c) => {
    const [ response, dispatch ] = useReducer(firestoreReducer, initialState)
    const [ isCancelled, setIsCancelled ] = useState(false)
   

    // collection ref
    const ref = collection(db, c)
    //  only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled){
            dispatch(action)
        }
    }

      // add a document
    const addDocument = async (doc) => {
            dispatch({ type: "IS_PENDING" })

        try {
            // const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await addDoc(ref, doc)
            
            dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument })
        }
        catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
        }

    }

    // delete document
    const deleteDocument = async (id) => {
      dispatch({type: 'IS_PENDING'})
      try {
        // const deletedDocument = await ref.doc(id).delete()
        const ref = doc(db, c, id)
        await deleteDoc(ref)
        dispatchIfNotCancelled({type: 'DELETED_DOCUMENT'})
      } catch (err) {
        dispatchIfNotCancelled({type: 'ERROR', payload:err})
      }

    }

    useEffect(() => {
        // In react 18 ucoment bellow
        setIsCancelled(false)
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response}
}