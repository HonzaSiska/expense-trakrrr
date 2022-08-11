import { NavLink } from 'react-router-dom'
import Dashboard from '../../pages/dashboard/Dashboard'
import Create from '../../pages/create/Create'


//styles
import './Sidebar.css'

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar-content">
            
            <nav className="links">
                <ul>
                    <li className='user'>
                        <span>User Name</span>
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
