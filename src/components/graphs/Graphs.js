import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useConversion } from '../../hooks/useConversion'


//styles
import './Graphs.css'
export default function Graphs() {

const { user } = useAuthContext()

// DATE RANGE TO FETCH DATA FOR GRAPHS
const startYear = new Date().getFullYear() - 3
const fullStartDate = parseFloat(new Date(`${startYear}-01-01`).valueOf())

const currentYear = parseFloat(new Date().valueOf())


//FETCH
const {documents, error} = useCollection('expenses', ["user", "==", user.uid], ['date', 'desc'], ["date", ">=", fullStartDate ],["date" ,"<=", currentYear])
const { parseYear, parseMonth } = useConversion()


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

  //TO EACH OBJECT ADD PROPERTY MONT PLUS SUM
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


console.log(groupedDocs)
console.log(updatedDocs)

  // add group identifier to each document
  return (
    <div className='graphs'>
        {updatedDocs &&
          updatedDocs.map(doc => (

            <div key={doc.id}>
            
              <span>{doc.year}/{doc.month}: {doc.amount}</span>
              
            </div>
          ))
        }
    </div>
  )
}
