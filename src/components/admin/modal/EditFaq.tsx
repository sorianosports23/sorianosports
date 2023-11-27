import { BsXLg } from "react-icons/bs"
import modalStyles from "../../../css/Modal.module.css"
import eventStyles from "../../../css/admin/events/EditEvent.module.css"
import useCloseModalKey from "../../../utils/useCloseModalKey"
import { FormEvent, useEffect, useState } from "react"

type TEditFaqProps = {
  open: boolean
  close: () => void
  info: TFaq
  handleSubmit: ({ id, name, response }: TFaq) => void
}

const EditFaq = ({ close, handleSubmit, info, open}: TEditFaqProps) => {

  const [editFaq, setEditFaq] = useState({
    id: 0,
    question: "",
    answer: ""
  })

  useEffect(() => {
    setEditFaq({
      id: info.id,
      question: info.name,
      answer: info.response
    })
  }, [info])

  const handleSubmitEdit = (ev: FormEvent) => {
    ev.preventDefault()
    const { answer, id, question } = editFaq
    handleSubmit({
      id,
      name: question,
      response: answer
    })
  }

  return (
    <div 
      className={modalStyles.cont}
      data-open={open}
      {...useCloseModalKey({open, close})}
    >
      <form 
        className={modalStyles.modal}  
        onSubmit={handleSubmitEdit}
      >
        <div className={modalStyles.header}>
          <h2>Editar pregunta</h2>
          <button
            onClick={close}
          >
            <BsXLg/>
          </button>
        </div>

        <div className={eventStyles.edit}>
          <div>
            <label htmlFor="faq_n">Pregunta</label>
            <input 
              type="text" 
              id="faq_n"
              value={editFaq.question}
              onChange={(ev) => setEditFaq(prev => ({...prev, "question": ev.target.value}))}
            />
          </div>

          <div>
            <label htmlFor="faq_a">Respuesta</label>
            <input 
              type="text" 
              id="faq_a"
              value={editFaq.answer}
              onChange={(ev) => setEditFaq(prev => ({...prev, "answer": ev.target.value}))}
            />
          </div>
        </div>

        <div className={`${modalStyles.footer} ${modalStyles.btns}`}>
          <button 
            type="button"
            className={modalStyles.btn_cancel}
            onClick={close}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={modalStyles.btn_accept}
          >
            Editar
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditFaq
