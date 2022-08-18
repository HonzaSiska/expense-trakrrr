import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if(context === undefined){
        throw new Error('useTheme()must be used inside a provider')
    }
    return context
}