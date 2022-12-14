import { useAuthContext } from '../../hooks/useAuthContext'
import { useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import { collection} from 'firebase/firestore'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'

//styles
import './Create.css'

export default function Create() {
  const { user,translate, lang } = useAuthContext()
  const { addDocument, response } = useFirestore('expenses')

  // Destructuring respone
  const { error, isPending, success, document } = response

  const [ description, setDescription ] = useState('')
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState(0)
  const [validationError, setValidationError] = useState(null)
  
  const navigate = useNavigate()
  
  useEffect(()=> {
    const message = translate(lang, 'Nový záznam byl vytvořen ','New expense was created','Nuevo gasto fue creado')
    success && setValidationError(message)
    success && setTimeout(() => {
      setValidationError('')
    }, 2500);

    setDate('')
    setAmount('')
    setDescription('')

  }, [success])

  //ADD Expense
  const handleSubmit = async(e) => {
      e.preventDefault()
      setValidationError(null)
      if(description ===''){
        const message = translate(lang, 'Vyplň pole popis','Fill out description','Complete la descripción')
        setValidationError(message)

        return
      }
      if(!date){
        const message = translate(lang, 'Vyplň pole datum','Fill out date','Complete la fecha')
        setValidationError(message)
        return
      }
      if(!amount || amount === 0){
        const message = translate(lang, 'Vyplň pole částka','Fill out amount','Complete la monto')
        setValidationError(message)
        return
      }
      const ref = collection(db, 'expenses')
      console.log('date',new Date(date))
      await addDocument({
        description,
        date: parseFloat(new Date(date).valueOf()),
        // date: date.replace(/-/g, ""),
        //date: serverTimestamp(date),
        amount: parseFloat(amount),
        user: user.uid
      })
      navigate('/')
      

  }
  return (
    <div className='create'>
        
        <div className="form">
        <h2 className='pageTitle'>{translate(lang, 'Nový záznam','New expense','Nuevo gasto')}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>{translate(lang, 'popis','description','descripcion')}</span>
                    <input
                        type='text'
                        onChange={(e)=> setDescription(e.target.value)}
                        value={description}
                    />
                </label>
                <label>
                    <span>{translate(lang, 'datum','date','fecha')}</span>
                    <input
                  
                    type="date" 
                    onChange={(e) => setDate(e.target.value)} 
                    value={date}
                    />
                </label>
                <label>
                    <span>{translate(lang, 'částka','amount','monto')}</span>
                    <input
                
                    type="number" 
                    onChange={(e) => setAmount(e.target.value)} 
                    value={amount}
                    />
                </label>
                
                { validationError && <p className='error'>{validationError}</p>}
                { error && <p className='error'>{error}</p>}
                {isPending ? <p>{translate(lang, 'ukládá se ...','processing ...','procesamiento ...')}</p> : <button className='btn'>{translate(lang, 'Uložit','Save','Guardar')}</button>}
            </form>
        </div>
    </div>
  )
}
