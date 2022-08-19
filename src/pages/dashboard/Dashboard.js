import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

//components
import DasboardList from './DashboardList'

//styles
import './Dashboard.css'

export default function Dashboard() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection('expenses', ["uid", "==", user.uid],
  //  [null]
   ["createdAt", "desc"])
  
  return (
    <div className='dashboard'>
    <h2 className='pageTitle'>Dashboard</h2>
      <div className='dashboard-items'>
        <DasboardList documents={documents} />
      </div>
        
    </div>
  )
}
