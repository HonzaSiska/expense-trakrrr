import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useState } from 'react'

//Components 
import Modal from '../../components/modal/Modal'

//styles
import '../../pages/dashboard/Dashboard.css'

export default function DashboardList({documents}) {

  const { lang, translate } = useAuthContext()
  const { deleteDocument } = useFirestore('expenses')

  const [ isOpen,setIsOpen ] = useState(false)
  const [ docId, setDocId ] = useState(null)

  const handleDelete = (docId) => {
    setIsOpen(true)
    setDocId(docId)
  }

  const handleClose = () => {
    setDocId(null)
    setIsOpen(false)
  }

  const removeDocument = (docId) => {
    deleteDocument(docId)
    setIsOpen(false)
  }

  

  const countryCode = translate(lang, 'cs-CZ', 'en-US', 'es-ES')

  console.log(documents)
//   console.log('locale', new Date(1660694400000).toLocaleString(
//     countryCode,
//     {
//     month: "short",
//     day: "2-digit",
//     year: "numeric",
//     }
// ))
  return (
    
    <div>
        {documents &&
            documents.map(doc => (
                <div className='expense-item' key={doc.id}>
                    <div>
                        <h3>{doc.description}</h3>
                        <div className='amount'>
                            <span >{translate(lang, 'částka', 'amount', 'monto')}: {doc.amount}</span>
                        </div>
                        <div className='date'>
                            <span>{
                                
                                new Date(doc.date).toLocaleString(
                                    countryCode,
                                    {
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric",
                                    }
                                )
                            }
                           
                            </span>
                        </div>
                        
                    </div>
                    <div>
                        <button onClick={()=> handleDelete(doc.id)} className='btn delete'>{translate(lang, 'Smazat', 'Delete', 'Borrar')}</button>
                    </div>
                    

                </div>
            ))
        }
        {isOpen && <Modal>
            <h1 style={{textAlign:'center', color:'white'}}>{translate(lang, 'Potvrdit smazání','Confirm Deletion', 'confirmar eliminación')}</h1>
            <button className='modal-delete-btn' onClick={()=> removeDocument(docId)} >{translate(lang, 'Smazat','Delete', 'Borrar')}</button>
            <button className='modal-cancel-btn' onClick={handleClose} >{translate(lang, 'zrušit', 'Cancel', 'Cancelar')}</button>
        </Modal>}
    </div>
  )
}
