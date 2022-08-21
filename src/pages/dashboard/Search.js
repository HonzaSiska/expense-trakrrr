import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useConversion } from '../../hooks/useConversion'
import { useState } from 'react'
import { useLocation, useNavigate} from 'react-router-dom'

//components
import DasboardList from './DashboardList'
import Summary from '../../components/summary/Summary'

//icons
import Search from '../../assets/search.svg'
import BackArrow from '../../assets/back.svg'

//styles
import './Dashboard.css'


export default function Dashboard() {

  const { user, lang, translate } = useAuthContext()
  const { formatDate, getFirstDayOfMonth } = useConversion()

  const navigate = useNavigate()

  //Parsing queries from URL
  const {search}  = useLocation()
  const query = new URLSearchParams(search)
  const queryStartDate = query.get('from')
  const queryEndDate = query.get('to')
  
  //convert query params to date
  const firstDay  = formatDate(new Date(queryStartDate))
  const currentDay  = formatDate(new Date(queryEndDate))
  
  //STATE
  const [startDate, setStartDate] = useState(firstDay)
  const [endDate, setEndDate] = useState(currentDay)

  // convert the date field values to milisecs for quering the DB
  const sd = parseFloat(new Date(startDate).valueOf())
  const ed = parseFloat(new Date(endDate).valueOf())

  console.log('query ', sd, ed)
  console.log('dates ', endDate, startDate)
   
  // QUERY THE DB COLLECTION USING CUSTOM HOOK useCollection
  const { documents, error } = useCollection('expenses', ["user", "==", user.uid], ['date', 'desc'], ["date", ">=", sd],["date" ,"<=", ed])
 console.log( `/search?from=${formatDate(sd)}&to=${formatDate(ed)}`)
  return (
    
    <div className='dashboard'>
    <div className="back">
        <button onClick={()=> navigate('/')}className='back'><img src={BackArrow} alt='back-arrow' /></button>
        <h2 className='pageTitle'>{translate(lang, `Výsledek hledání`,`Search Results`,`Resultados`)} </h2>    
    </div>
    <div className="summary-wrapper">
      <span>
        {translate(lang, 'Celkové náklady','Total Expenses', 'Gastos totales')} - 
      </span>
      {documents && <Summary documents={documents}/>}
    </div>
    
      {/* <div className='date-range'>
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
        <Link to={`/search?from=${formatDate(sd)}&to=${formatDate(ed)}`}>
            <img src={Search} alt='search-icon' />
        </Link>
      </div> */}
      <div className='dashboard-items'>
        {error && <p>{error}</p>}
        {!error  && <DasboardList documents={documents} />}  
      </div>
        
    </div>
  )
}
