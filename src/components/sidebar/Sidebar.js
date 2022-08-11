import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'

//components
import Avatar from '../avatar/Avatar'

//styles
import './Sidebar.css'

export default function Sidebar() {
    const { user }  = useAuthContext()
  return (
    <div className='sidebar'>
        <div className="sidebar-content">
            
            <nav className="links">
                <ul>
                    <li className='user'>
                        <Avatar url={user.photoURL}/>
                        <p>{user.displayName}</p>
                    </li>
                    <li>
                        <NavLink to='/'>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to='/create'>Create</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}
