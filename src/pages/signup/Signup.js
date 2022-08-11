import { useState } from 'react'


//Styles
import './Signup.css'

export default function Signup() {

    const [ email, setEmail ] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)

    const handleFile = (e) => {

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password, displayName)
    }

  return (
    <div className='signup'>
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
                <label>
                    <span>display name:</span>
                    <input
                    required
                    type="text" 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    value={displayName}
                    />
                </label>
                <label>
                    <span>profile image:</span>
                    <input
                        type='file'
                        required
                        onChange={handleFile}
                    />
                    {thumbnailError && <div className='error'>{thumbnailError}</div>}
                </label>
                <button className='btn'>Submit</button>
            </form>
        </div>
    </div>
  )
}
