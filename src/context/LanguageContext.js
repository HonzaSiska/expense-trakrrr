import { createContext, useReducer } from 'react'

export const LanguageContext  = createContext()

const languageReducer = (state, action) => {
   
    switch (action){
        case 'CHANGE_LANGUAGE':
            
              return { ...state, lang: action.payload}
        default:
             return state
    }
}
export function LanguageProvider({children}){
    const [state, dispatch ] = useReducer(languageReducer, {
        lang: 'english'
    })

    const changeLanguage = (language) => {
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

    
    return (
        <LanguageContext.Provider value={{...state, changeLanguage, translate}}>
            {children}
        </LanguageContext.Provider>
    )
}