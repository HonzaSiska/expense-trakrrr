//styles
import './Summary.css'

import React from 'react'

export default function Summary({documents}) {

  const sum = documents.reduce((acc, currVal)=> {
    return acc + currVal.amount
  }, 0)

  return (
    <div className='summary'>
        <span className='sum'>{sum}</span>
    </div>
  )
}
