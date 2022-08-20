import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useConversion } from '../../hooks/useConversion'
import { useState } from 'react'

//components
import DasboardList from './DashboardList'

//icons
import Search from '../../assets/search.svg'

//styles
import './Dashboard.css'


export default function Dashboard() {

  const { user, lang, translate } = useAuthContext()
  const { formatDate, getFirstDayOfMonth } = useConversion()

  // GENERATE FIRST DAY  AND CURRENT DAY OF THE MONTH
  const firstDay  = getFirstDayOfMonth(new Date())
  const currentDay  = formatDate(new Date())
  
  //STATE
  const [startDate, setStartDate] = useState(firstDay)
  const [endDate, setEndDate] = useState(currentDay)

  // convert the date field values to milisecs for quering the DB
  const sd = parseFloat(new Date(startDate).valueOf())
  const ed = parseFloat(new Date(endDate).valueOf())
   
  // QUERY THE DB COLLECTION USING CUSTOM HOOK useCollection
  const { documents, error } = useCollection('expenses', ["user", "==", user.uid], ['date', 'desc'], ["date", ">=", sd],["date" ,"<=", ed])

  return (
    
    <div className='dashboard'>
    <h2 className='pageTitle'>Dashboard</h2>
      <div className='date-range'>
        <label>
          <span>{translate(lang, 'od', 'start date', 'fecha de inicio')}</span>
          <input
            type='date'
            onChange={(e)=> setStartDate(formatDate(e.target.value))}
            value={startDate}
          />
        </label>
        <label>
          <span>{translate(lang, 'do', 'end date', 'fecha final')}</span>
          <input
            type='date'
            onChange={(e)=> setEndDate(formatDate(e.target.value))}
            value={endDate}
          />
        </label>
        <img src={Search} alt='search-icon'/>
      </div>
      <div className='dashboard-items'>
      {error && <p>{error}</p>}
      {!error  && <DasboardList documents={documents} />}
        
      </div>
        
    </div>
  )
}
