import { Link }  from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

//  assets
import Cz from '../../assets/cze.svg'
import Esp from '../../assets/esp.svg'
import Gb from '../../assets/gb.svg'
import Bitcoin from '../../assets/bitcoin.svg'



//styles
import './Navbar.css'

export default function Navbar() {
  const { logout, isPending, error } = useLogout()
  const { user } = useAuthContext()
  return (
    <nav className='navbar'>
        <ul>
        
            <li className='logo'>
            <img src={Bitcoin} alt='image-logo'/><span>EXPENSE-TRAKRR</span>
            </li>
            <li className='flags-wrapper'>              
                
                <div className='flag'>
                    <img src={Esp} alt='spain-flag'/>
                </div>
                <div className='flag'>
                    <img src={Gb} alt='britain-flag'/>
                </div>
                <div className='flag'>
                    <img src={Cz} alt='czech-flag'/>
                </div>
            </li>
            <li className='login-nav'>
              { !user ? (
                <>
                <Link to='/login'>Login</Link> 
                <Link to='/signup'>Signup</Link>
                </>
              ) : 
                (<button onClick={logout} className="btn">Logout</button>)
              }
              
              
            </li>
              
        </ul>
    </nav>
  )
}
