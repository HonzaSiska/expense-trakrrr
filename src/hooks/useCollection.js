import { db } from '../firebase/config'
import { collection, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore'
import { useAuthContext } from './useAuthContext'
import { useState, useEffect, useRef } from 'react'

export const  useCollection  = ( c, _query, _orderBy, _startDate, _endDate) => {
    const [ documents, setDocuments ] = useState(null)
    const [ error, setError ] = useState(null)

    // use ref to stop ussEffect from evaluating and creating infinite loop because of the the array variables
     const q = useRef(_query).current
     const ob = useRef(_orderBy).current
     const ed = useRef(_endDate).current
     const sd = useRef(_startDate).current


    useEffect(() => {

        let ref = collection(db, c)

        if(q){
            ref = query(ref,where(...q))
        }
        if(ob){
            ref = query(ref,orderBy(...ob))
        }
        if(sd){
            ref = query(ref, where(...sd))
        }
        if(ed){
            ref = query(ref, where(...ed))
        }

        

        //LIMIT QUERY
        // ref = query(ref, limit(3))

        // real time listener for changes in the DB
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach((doc)=> {
                results.push({ ...doc.data(), id: doc.id })
            })
            //update state

            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('Could not fetch the data')
        })

        // unsubscribe

        return () => unsubscribe()
    }, [c, q, ob, sd, ed])

    //query, orderBy    .add to dependency array in use effect

    return { documents, error }
}