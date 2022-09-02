import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { useAuthContext } from '../../hooks/useAuthContext'


//Styles
import './Signup.css'

export default function Signup() {

    const [ email, setEmail ] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)

    const { signup, isPending, setIsPending, error} = useSignup()
    const { user, lang, translate  }  = useAuthContext()

    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]
        console.log(selected)
    
        // if (!selected) {
        //   const message = translate(lang, 'Vyber soubor','Please select a file','Seleccione un archivo') 
        //   setThumbnailError(message)
        //   setIsPending(false)
        //   setThumbnail(null)
        //   setTimeout(() => {
        //     setThumbnailError(null)
        //   }, 2000);
        //   return
        // }
        if (!selected.type.includes('image')) {
          const message = translate(lang, 'Zvolený soubor musí být fotka','Selected file must be an image','El archivo seleccionado debe ser una imagen') 
          setThumbnailError(message)
          setIsPending(false)
          setThumbnail(null)
          setTimeout(() => {
            setThumbnailError(null)
          }, 2000);
          return
        }
        if (selected.size > 100000) {
          const message = translate(lang, 'Zvolený soubor musí být menší než 100kb','Image file size must be less than 100kb','El tamaño del archivo de imagen debe ser inferior a 100 kb') 
          setThumbnailError(message) 
          setIsPending(false)
          setThumbnail(null)
          setTimeout(() => {
            setThumbnailError(null)
          }, 2000);
          return
        }
        
        setThumbnailError(null)
        setThumbnail(selected)
        
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if(thumbnailError) return
        console.log(thumbnail)
        signup(email,password,displayName, thumbnail)
        
    }


  return (
    <div className='signup'>
        <h2 className='pageTitle'>{translate(lang, 'Registrace','Registro')}</h2>
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
                <label>
                    <span>{translate(lang, 'uživatelské jméno','display name','usuario')}</span>
                    <input
                    required
                    type="text" 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    value={displayName}
                    />
                </label>
                <label>
                    <span>{translate(lang, 'profilové foto','profile image','foto de perfil')} {'  (max 100kb)'}</span>
                    <input
                        type='file'
                        onChange={handleFileChange}
                    />
                    {thumbnailError && <div className='error'>{thumbnailError}</div>}
                </label>
                {error && <p className='error'>{error}</p>}
                {isPending ? <p>{translate(lang, 'probihá registrace ...','processing ...','procesamiento ...')}</p> : <button className='btn'>{translate(lang, 'odeslat','send','subir')}</button>}
            </form>
        </div>
    </div>
  )
}
