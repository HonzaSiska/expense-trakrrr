import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

//Styles
import './Login.css'

export default function Login() {

    const [ email, setEmail ] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')

    const { login, isPending, error } = useLogin()
    
  

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
                    <span>password:</span>
                    <input
                    required
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    />
                </label>
                
                { error && <p className='error'>{error}</p>}
                <button className='btn'>Submit</button>
            </form>
        </div>
    </div>
  )
}
