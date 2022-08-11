import { Link }  from 'react-router-dom'
import Cz from '../../assets/cze.svg'
import Esp from '../../assets/esp.svg'
import Gb from '../../assets/gb.svg'
//styles
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className='navbar'>
        <ul>
        
            <li className='logo'>
                <span>EXPENSE-TRAKRR</span>
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
              <Link to='/login'>Login</Link> 
              <Link to='/signup'>Signup</Link>
              <button className="btn">Logout</button>
            </li>
              
        </ul>
    </nav>
  )
}
