import { Link }  from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'
// import { useLanguage } from '../../hooks/useLanguage'
//  assets
import Cz from '../../assets/cze.svg'
import Esp from '../../assets/esp.svg'
import Gb from '../../assets/gb.svg'
import Bitcoin from '../../assets/bitcoin.svg'



//styles
import './Navbar.css'


export default function Navbar() {
  const { logout, isPending, error } = useLogout()
  const { user, lang, changeLanguage,translate } = useAuthContext()
  

  
  return ( 
    <nav className='navbar'>
        <ul>
            <li className='logo'>
             <img src={Bitcoin} alt='image-logo'/><span>EXPENSE-TRAKRR</span>
            </li>
            <li className='flags-wrapper'>              
                
                <div className='flag'>
                    <img src={Esp} alt='spain-flag' onClick={() => {
                      changeLanguage('espanol')
                      
                    }}/>
                </div>
                <div className='flag'>
                    <img src={Gb} alt='britain-flag' onClick={() => {
                      changeLanguage('english')
                      
                    }}/>
                </div>
                <div className='flag'>
                    <img src={Cz} alt='czech-flag' onClick={() => {
                      changeLanguage('cesky')
                      
                    }}/>
                </div>
            </li>
            <li className='login-nav'>
              { !user ? (
                <>
                <Link to='/login'>{ translate(lang, 'Přihlásit se','Login','Iniciar sesión') }</Link> 
                <Link to='/signup'>{ translate(lang, 'Registrace','Signup','Regístrate') }</Link>
                </>
              ) : 
                (<button onClick={logout} className="btn">{ translate(lang, 'Odhlásit se','Logout','Cerrar sesión') }</button>)
              }
              
              
            </li>
              
        </ul>
    </nav>
  )
}
