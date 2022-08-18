import { useAuthContext } from '../../hooks/useAuthContext'
import { useState } from 'react'
import { db } from '../../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

//styles
import './Create.css'

export default function Create() {
  const { user,translate, lang } = useAuthContext()

  const [ description, setDescription ] = useState('')
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  // console.log(user.uid)
  // console.log({
  //   description,
  //   date,
  //   amount,
  //   user: user.uid
  // })

  const handleSubmit = async(e) => {
      e.preventDefault()
      setError(null)
      if(description ===''){
        const message = translate(lang, 'Vyplň pole popis','Fill out description','Complete la descripción')
        setError(message)
        return
      }
      if(!date){
        const message = translate(lang, 'Vyplň pole datum','Fill out date','Complete la fecha')
        setError(message)
        return
      }
      if(!amount || amount === 0){
        const message = translate(lang, 'Vyplň pole částka','Fill out amount','Complete la monto')
        setError(message)
        return
      }
      const ref = collection(db, 'expenses')

      try {
        await addDoc(ref,{
          description,
          date: new Date(date),
          amount,
          user: user.uid
        })

        setDate('')
        setAmount('')
        
        const message = translate(lang, 'Nový záznam byl vytvořen ','New expense was created','Nuevo gasto fue creado')
        setError(message)
        setTimeout(() => {
          setError('')
        }, 2500);

      } catch (err) {
        const message = translate(lang, 'Nový záznam NEBYL vytvořen....error','New expense was NOT created ...error','Nuevo gasto NO fue creado ...error')
        setError(message)
      }
      

  }
  return (
    <div className='create'>
        <h2 className='pageTitle'>{translate(lang, 'Vztvořit nový záznam','Create a new expense','Crear un nuevo gasto')}</h2>
        <div className="form">
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
                
                { error && <p className='error'>{error}</p>}
                {isPending ? <p>{translate(lang, 'ukládá se ...','processing ...','procesamiento ...')}</p> : <button className='btn'>{translate(lang, 'Přihlásit se','Send','Iniciar sesión')}</button>}
            </form>
        </div>
    </div>
  )
}
