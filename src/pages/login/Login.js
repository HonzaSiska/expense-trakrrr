import { useState } from 'react'


//Styles
import './Login.css'

export default function Login() {

    const [ email, setEmail ] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
  

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password, displayName)
    }

  return (
    <div className='login'>
        <h2 className='pageTitle'>Signup</h2>
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
                
                
                <button className='btn'>Submit</button>
            </form>
        </div>
    </div>
  )
}
