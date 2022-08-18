import { useAuthContext } from '../../hooks/useAuthContext'

//styles
import './Create.css'

export default function Create() {
  const { translate, lang } = useAuthContext()
  return (
    <div className='create'>
        <h2 className='pageTitle'>{translate(lang, 'Vztvořit nový záznam','Create a new expense','Crear un nuevo gasto')}</h2>
    </div>
  )
}
