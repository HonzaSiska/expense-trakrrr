import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { useAuthContext } from '../../hooks/useAuthContext'

//Styles
import './Login.css'

export default function Login() {

    const [ email, setEmail ] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')

    const { login, isPending, error } = useLogin()

    const { lang, translate } = useAuthContext()
    
  

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password, displayName)
        login(email, password, displayName)
    }

  return (
    <div className='login'>
        <h2 className='pageTitle'>Login</h2>
        <div className="form">
            <form onSubmit={handleSubmit}>
                <label>
                    <span>email:</span>
                    <input
                        type='email'
                        required
                        onChange={(e)=> setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    <span>{translate(lang, 'heslo','password','contraseña')}</span>
                    <input
                    required
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    />
                </label>
                
                { error && <p className='error'>{error}</p>}
                {isPending ? <p>{translate(lang, 'probihá přihášení ...','processing ...','procesamiento ...')}</p> : <button className='btn'>{translate(lang, 'Přihlásit se','Send','Iniciar sesión')}</button>}
            </form>
        </div>
    </div>
  )
}
