import { BsXLg } from "react-icons/bs"
import modalStyles from "../../../css/Modal.module.css"
import { useEffect, useId, useState } from "react"
import LoaderComp from "../../LoaderComp"

type TContactModalProps = {
  id: number
  open: boolean
  close: () => void
  form: TContact
}

type TContactInfo = {
  form: TContact
  user: TUser
}

const DEFAULT_VALUE: TContactInfo = {
  form: {
    id: 0,
    name: "",
    email: "",
    subject: "",
    messageContact: ""
  },
  user: {
    username: "",
    phone: 0,
    ci: 0,
    fullname: "",
    permissions: [],
    age: 0,
    email: ""
  }
}

const ContactModal = ({ id, open, close, form }: TContactModalProps) => {

  const [info, setInfo] = useState<TContactInfo>(DEFAULT_VALUE)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    handleGetInfo(id)
    handleUpdateForm(form)
  }, [id, form])

  const handleUpdateForm = (newForm: TContact) => {
    setInfo(prev => ({
      ...prev,
      form: newForm
    }))
  }

  const handleGetInfo = async (id: number) => {
    setLoading(true)



    setLoading(false)
  } 

  return (
    <div
      data-open={open}
      className={modalStyles.cont}
    >
      <div
        className={modalStyles.modal}
      >
        <div
          className={modalStyles.header}
        >
          <h2>Contacto ({id})</h2>
          <button
            onClick={close}
          >
            <BsXLg/>
          </button>
        </div>

        <div className={`${modalStyles.contact_form} ${modalStyles.body}`}>
        {
          loading
            ? <LoaderComp/>
            : (
              <div className={modalStyles.c_form}>
                <h4>Formulario</h4>

                <div>
                  <label htmlFor="mc_id">Nombre:</label>
                  <input 
                    type="text" 
                    value={info.form.name}
                    readOnly
                  />
                </div>

                <div>
                  <label htmlFor="mc_id">Asunto:</label>
                  <input 
                    type="text" 
                    value={info.form.subject}
                    readOnly
                  />
                </div>

                <div>
                  <label htmlFor="mc_id">Correo:</label>
                  <input 
                    type="text" 
                    value={info.form.email}
                    readOnly
                  />
                </div>
                
                <div className={modalStyles.c_msg}>
                  <label htmlFor="mc_id">Mensaje</label>
                  <textarea 
                    readOnly
                  >
                    {info.form.messageContact}
                  </textarea>
                </div>
              </div>
            )
        }
      </div>

      <div className={`${modalStyles.footer} ${modalStyles.btns}`}>
        <button>Marcar como resuelto</button>
        <button onClick={close}>Cerrar</button>
      </div>
      </div>
    </div>
  )
}

export default ContactModal
