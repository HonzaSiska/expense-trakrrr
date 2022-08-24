import { useEffect, useState   } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useConversion } from '../../hooks/useConversion'

//components
import { AreaChart, linearGradient, CartesianGrid,Tooltip, Area, XAxis,YAxis,PieChart, Pie, ResponsiveContainer , Sector, Cell} from 'recharts';
import PieChartIcon from '../../assets/pie-chart.png'
import MyPieChart from '../../components/graphs/MyPieChart'

//styles
import './Graphs.css'


export default function Graphs() {

 
  const { user, lang, translate } = useAuthContext()
  const [isOpen, setIsOpen ] = useState(false)
  const { parseYear, parseMonth, dateByLanguage } = useConversion()

  // DATE RANGE TO FETCH DATA FOR GRAPHS
  const startYear = new Date().getFullYear() - 2
  const fullStartDate = parseFloat(new Date(`${startYear}-01-01`).valueOf())
  const currentYear = parseFloat(new Date().valueOf())


  //FETCH
  const {documents, error} = useCollection('expenses', ["user", "==", user.uid], ['date', 'desc'], ["date", ">=", fullStartDate ],["date" ,"<=", currentYear])
  

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
 
                                              
  //imutable
  let updatedDocs = []

  //AD PARSED MONTH AND YEAR TO EACH DOC
  if(documents){
    documents.map(doc => {
      updatedDocs.push ({ ...doc, year: parseYear(doc.date), month: parseMonth(doc.date) })
    })
  }


  // GROUP AND SUM BY MONTH
  let groupedDocs = {}

  if(updatedDocs){
    updatedDocs.map((doc) => {

      // Create properties Years and empty object as value, that will hold sums by month for particular year
      const year = doc.year
      if(!groupedDocs.hasOwnProperty(year)){
        groupedDocs = {...groupedDocs, [year] : {}}
      }

      //month group
      //  const month = doc.month
      //  if(!groupedDocs.hasOwnProperty(month)){
      //   groupedDocs = {...groupedDocs, [month] : doc.amount}
      //   console.log(doc.amount)

      //  }else{
      //   groupedDocs = {...groupedDocs, [month] : groupedDocs[month] + doc.amount}
      //  }
    })

    //TO EACH OBJECT ADD PROPERTY AMOUNT PLUS SUM
    for(const key in groupedDocs){
      updatedDocs.forEach((doc) => {

        const month = doc.month

        if(key == doc.year){

          //if month exists , add sum to the amount
          if(groupedDocs[key].hasOwnProperty(month)){
            groupedDocs[key][month] = groupedDocs[key][month] + doc.amount

          // if month doesnt exist use amount as value
          }else{
            groupedDocs[key][month] = doc.amount
          } 
        }
      })
    }
  }

  
  // groups and sums by year
  let summary = []
  if(groupedDocs) {
    for(const key in groupedDocs){
        console.log('key',key)
        let acc = 0
        for(const month in groupedDocs[key]){
          console.log('value', parseInt(groupedDocs[key][month]))
          acc = groupedDocs[key][month] + acc
        }
        summary.push({ 
          name: key,
          value: acc
        })
      }
      
      }
      
    
    console.log('groupeeDocs', groupedDocs)
    console.log('group by year', summary )
  
  
  
  
    return (
      <div className='graphs'>
          <img onClick={handleOpen} src={PieChartIcon} alt='chart-icon' className='chart-icon'/>
          <div  className={isOpen ? 'chart-wrapper slideIn': 'chart-wrapper '}>
          <h3>{dateByLanguage(new Date(`${startYear}-01-01`), lang)} - {dateByLanguage(new Date(), lang)}</h3>
            <AreaChart width={300} height={200} data={updatedDocs} margin={{ top: 50, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient> */}
              </defs>
              <XAxis dataKey="year" />
              <YAxis dataKey="amount"/>
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
              <Area type="monotone" dataKey="month" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
            <div></div>
            
            <MyPieChart docs={summary}/>

          </div>
          
      </div>
    )
}
