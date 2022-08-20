import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState } from 'react'

//components
import DasboardList from './DashboardList'

//icons
import Search from '../../assets/search.svg'

//styles
import './Dashboard.css'

export default function Dashboard() {

  const { user, lang, translate } = useAuthContext()

  // ----> nutno dynamicky nastavit datum na soucasny mesic
  const [startDate, setStartDate] = useState('2022-08-01')
  const [endDate, setEndDate] = useState('2022-08-19')

  // convert date field value to milisecs
  const sd = parseFloat(new Date(startDate).valueOf())
  const ed = parseFloat(new Date(endDate).valueOf())
   

  const { documents, error } = useCollection('expenses', ["user", "==", user.uid], ['date', 'desc'], ["date", ">", sd],["date" ,"<", ed])
  //const { documents, error } = useCollection('expenses', ["user", "==", user.uid], ['date', 'desc'], ["date", ">", parseFloat(new Date('2022-08-15').valueOf())])
  // const { documents, error } = useCollection('expenses', ["user", "==", user.uid], ['date', 'desc'], ["date", ">", parseFloat(new Date('2022-08-15').valueOf()), "date"],["date" ,"<", parseFloat(new Date('2022-08-17').valueOf())])
  // console.log('ts', parseFloat(new Date('2022-08-17').valueOf()))
  console.log('startDate',startDate)


  // FORMAT DATE TP (YYYY_MM_DD)
  const formatDate = (date) => {
    const myDate = new Date(date);
    let d = myDate.getDate();
    let m =  myDate.getMonth();
    m += 1;  
    const y = myDate.getFullYear();
    m = m < 10 ? `0${m}` : m
    d = d < 10 ? `0${d}` : d
    const newDate=(y+ "-" + m + "-" + d);
    return newDate
  }

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
