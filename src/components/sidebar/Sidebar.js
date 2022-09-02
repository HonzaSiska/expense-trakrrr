import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import User from '../../assets/user.svg'

//components
import Avatar from '../avatar/Avatar'
import Menu from './../../assets/menu.svg'
import Close from './../../assets/close.svg'


//styles
import './Sidebar.css'

export default function Sidebar() {
  const { user, lang, translate  }  = useAuthContext()
  const [ isOpen, setIsOpen ] = useState(false)

  const openMenu = () => {
    setIsOpen(true)
  }
  const closeMenu = () => {
    setIsOpen(false)
  }

  console.log('this is user', user)
  return (
    <div className={isOpen ? 'sidebar slide-menu-in': 'sidebar'}>
        <div className="sidebar-content">
            <div className='open-menu'>
                {!isOpen && <img onClick={openMenu} src={Menu} alt='menu-icon'/>}
                {isOpen && <img className="close-btn" onClick={closeMenu} src={Close} alt='close'/>}
            </div>
            
            <nav className="links">
                <ul>
                    
                    <li className='user'>
                        {user.photoURL  && <Avatar url={user.photoURL}/> }
                        {!user.photoURL && <Avatar url={User}/>}   
                        {/* <Avatar url={user.photoURL}/> 
                        <Avatar url={User}/>  */}
                        
                        <p>{user.displayName}</p>
                    </li>
                    <li>
                        <NavLink to='/'>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to='/create'>{ translate(lang, 'Nový','Create','Crear') }</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}
