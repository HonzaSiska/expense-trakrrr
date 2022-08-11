import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'


//Styles
import './Signup.css'

export default function Signup() {

    const [ email, setEmail ] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)

    const { signup, isPending, error} = useSignup()

    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]
        console.log(selected)
    
        if (!selected) {
          setThumbnailError('Please select a file')
          return
        }
        if (!selected.type.includes('image')) {
          setThumbnailError('Selected file must be an image')
          return
        }
        if (selected.size > 100000) {
          setThumbnailError('Image file size must be less than 100kb')
          return
        }
        
        setThumbnailError(null)
        setThumbnail(selected)
        console.log('thumbnail updated')
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password, displayName)
        signup(email,password,displayName, thumbnail)
        
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
                        onChange={handleFileChange}
                    />
                    {thumbnailError && <div className='error'>{thumbnailError}</div>}
                </label>
                {error && <p className='error'>{error}</p>}
                {isPending ? <p>Processing ...</p> : <button className='btn'>Submit</button>}
            </form>
        </div>
    </div>
  )
}
