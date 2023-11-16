import { BsXLg } from "react-icons/bs"
import modalStyles from "../../../css/Modal.module.css"
import { useContext, useEffect, useId, useState } from "react"
import LoaderComp from "../../LoaderComp"
import apiAdminEditStatus from "../../../api/admin/contact/editStatus"
import { userSessionContext } from "../../../context/session/UserSessionContext"

type TContactModalProps = {
  id: number
  open: boolean
  close: () => void
  form: TContact
  openModal: (msg: string, otMsg: string, reload: boolean) => void
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
    status: 1,
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

const ContactModal = ({ id, open, close, form, openModal }: TContactModalProps) => {

  const { token } = useContext(userSessionContext)

  const [info, setInfo] = useState<TContactInfo>(DEFAULT_VALUE)
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState("")

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

  const handleUpdateStatus = async (status: 1|2) => {
    const data = {
      token,
      id,
      status
    }

    const res = await apiAdminEditStatus(data)

    if (res.status) {
      openModal("Se actualizo el estado", "", true)
      close()
    } else {
      openModal("No se pudo editar el estado", res.message, false)
    }
  }

  const handleGetInfo = async (id: number) => {
    setLoading(true)

    setLoading(false)
  } 

  useEffect(() => {
    console.log("FORM", form)
  }, [form])

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
                  <label htmlFor="mc_id">Mensaje:</label>
                  <textarea 
                    readOnly
                    value={info.form.messageContact}
                  >
                    {info.form.messageContact}
                  </textarea>

                <div className={modalStyles.c_msg_resp}>
                  <label htmlFor="mc_id">Respuesta:</label>
                  <textarea 
                  placeholder="Escribe la respuesta."
                  >
                    
                    
                  </textarea>
                </div>

                </div>
              </div>
            )
        }
      </div>

      <div className={`${modalStyles.footer} ${modalStyles.btns}`}>
        <button
          onClick={() => handleUpdateStatus(Number(form.status) === 1 ? 2 : 1)}
        >
          Marcar como {Number(form.status) === 1 ? "resuelto" : "en espera"}
        </button>
        <button onClick={close}>Cerrar</button>
      </div>
      </div>
    </div>
  )
}

export default ContactModal
