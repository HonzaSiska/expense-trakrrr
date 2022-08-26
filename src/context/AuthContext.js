import { createContext, useReducer, useEffect } from 'react'
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true }
    case 'CHANGE_LANGUAGE': 
      return { ...state, lang: action.payload}
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    authIsReady: false,
    lang: 'english'
  })

  const changeLanguage = (language) => {
    localStorage.removeItem('language')
    localStorage.setItem('language', language)
    dispatch({
        type: 'CHANGE_LANGUAGE',
        payload: language
    })
}

const translate = (lang, czWord, enWord, espWord) => {
   
    switch(lang){
        case 'cesky':
            return czWord
        case 'espanol':
            return espWord
        case 'english':
            return enWord
        
    }
}


  useEffect(() => {
    
    const unsub = onAuthStateChanged(auth, user => {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      unsub()
    })
  }, [])


  
  return (
    <AuthContext.Provider value={{ ...state, dispatch, changeLanguage, translate }}>
      { children }
    </AuthContext.Provider>
  )

}