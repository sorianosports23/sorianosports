import Admin from "../Admin"
import searchStyles from "../../../css/admin/page/Search.module.css"
import { BsCloudUpload } from "react-icons/bs"
import { FormEvent, useContext, useState } from "react"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiAdminAddFaq from "../../../api/admin/faq/addFaq"
import SendModal from "../../../components/modal/SendModal"

const Faq = () => {

  const { token } = useContext(userSessionContext)
  const [faqData, setFaqData] = useState({
    question: "",
    answer: ""
  })
  
  //!MODAL
  const [sendModal, setSendModal] = useState(false)
  const [sendModalMsg, setSendModalMsg] = useState("")
  const [sendModalOtMsg, setSendModalOtMsg] = useState("")

  const handleOpenModal = (msg: string, otMsg: string = "") => {
    setSendModalMsg(msg)
    setSendModalOtMsg(otMsg)
    setSendModal(true)
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()

    const data: TApiAdminAddFaqRequest = {
      token,
      question: faqData.question,
      response: faqData.answer
    }
    
    const res = await apiAdminAddFaq(data)

    if (res.status) {
      handleOpenModal("Se agrego la pregunta")
    } else {
      handleOpenModal("No se pudo añadir la pregunta", res.message)
    }
  }

  return (
    <Admin route_title="Agregar pregunta frecuente">
      <form onSubmit={handleSubmit} className={searchStyles.form_inputs}>
        <div>
          <label htmlFor="f_q">Pregunta</label>
          <input 
            type="text" 
            id="f_q"
            value={faqData.question}
            onChange={(ev) => setFaqData(prev => ({...prev, "question": ev.target.value}))}
          />
        </div>

        <div>
          <label htmlFor="f_a">Respuesta</label>
          <input 
            type="text" 
            id="f_a"
            value={faqData.answer}
            onChange={(ev) => setFaqData(prev => ({...prev, "answer": ev.target.value}))}
          />
        </div>

        <div className={searchStyles.form_send}>
          <button
            type="submit"
          >
            <BsCloudUpload/> Publicar
          </button>
        </div>
      </form>

      <SendModal
        open={sendModal}
        close={() => setSendModal(false)}
        message={sendModalMsg}
        otherMessage={sendModalOtMsg}
      />
    </Admin>
  )
}

export default Faq
