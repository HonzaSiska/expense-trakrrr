import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useConversion } from '../../hooks/useConversion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//components
import DasboardList from './DashboardList'
import Summary from '../../components/summary/Summary'


//icons
import Search from '../../assets/search.svg'

//styles
import './Dashboard.css'




export default function Dashboard() {

  const { user, lang, translate } = useAuthContext()
  const { formatDate, getFirstDayOfMonth, dateByLanguage } = useConversion()

  const navigate = useNavigate()


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
    <div className="summary-wrapper">
      <span>
        {translate(lang, 'Celkové náklady','Total Expenses', 'Gastos totales')} - 
      </span>
      {documents && <Summary documents={documents}/>}
    </div>
    
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

        {/* on click sends constructed query, dates converted from milisecs do dat format 
        it will be converted to milisecs in on the search page for quering the DB*/}
        <img src={Search} alt='search-icon' onClick={()=> navigate(`/search?from=${formatDate(sd)}&to=${formatDate(ed)}`)}/>
      
      </div>
      
      <div className='dashboard-items'>
        <h3>{dateByLanguage(new Date(firstDay), lang)} - {dateByLanguage(new Date(), lang)}</h3>
        {error && <p>{error}</p>}
        {!error  && <DasboardList documents={documents} />} 
      </div>
        
    </div>
  )
}
