import { BsXLg } from "react-icons/bs"
import modalStyles from "../../../css/Modal.module.css"
import styles from "../../../css/admin/events/EditEvent.module.css"
import { FormEvent, useEffect, useState } from "react"
import LoaderComp from "../../LoaderComp"
import Loader from "../../Loader"

type TEditEventProps = {
  open: boolean
  close: () => void
  info: TEvent
  submitting: boolean
  handleSubmit: ({ id, name, description, place, sport, time, date_ev }: Omit<TApiAdminModifyEventRequest, "token">) => void
}

const EditEvent = ({ open, close, info, submitting, handleSubmit }: TEditEventProps) => {
  
  const [editName, setEditName] = useState(info.name)
  const [editDesc, setEditDesc] = useState(info.description) 
  const [editSport, setEditSport] = useState(info.sport) 
  const [editPlace, setEditPlace] = useState(info.place) 
  const [editDate, setEditDate] = useState(info.date_ev) 
  const [editTime, setEditTime] = useState(info.time) 
  
  useEffect(() => {
    setEditName(info.name)
    setEditDesc(info.description)
    setEditSport(info.sport)
    setEditPlace(info.place)
    setEditDate(info.date_ev)
    setEditTime(info.time)
  }, [info])

  const handleSubmitEv = (ev: FormEvent) => {
    ev.preventDefault()
    const data = {
      id: info.id,
      name: editName,
      description: editDesc,
      sport: editSport,
      place: editPlace,
      date_ev: editDate,
      time: editTime
    }
    handleSubmit(data)
  }

  return (
    <div 
      className={modalStyles.cont}
      data-open={open}
    >
      <form className={modalStyles.modal} onSubmit={handleSubmitEv}>
        <div className={modalStyles.header}>
          <h2>Editar evento</h2>
          <button
            type="button"
            onClick={close}
          >
            <BsXLg/>
          </button>
        </div>

        <div className={styles.edit}>
          <div>
            <label htmlFor="es_name">Nombre:</label>
            <input 
              type="text" 
              id="es_name"
              value={editName}
              onChange={(ev) => setEditName(ev.target.value)}
            />
          </div>
          <div className={styles.textarea}>
            <label htmlFor="es_description">Descripcion:</label>
            <textarea 
              id="es_description"
              value={editDesc}
              onChange={(ev) => setEditDesc(ev.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="es_sport">Deporte:</label>
            <input 
              type="text" 
              id="es_sport"
              value={editSport}
              onChange={(ev) => setEditSport(ev.target.value)}
            />
          </div>
          <div>
            <label htmlFor="es_place">Lugar:</label>
            <input 
              type="text" 
              id="es_place" 
              value={editPlace}
              onChange={(ev) => setEditPlace(ev.target.value)}
            />
          </div>
          <div>
            <label htmlFor="es_date">Fecha:</label>
            <input 
              type="date" 
              id="es_date"
              value={editDate}
              onChange={(ev) => setEditDate(ev.target.value)}
            />
          </div>
          <div>
            <label htmlFor="es_time">Duración:</label>
            <input 
              type="text" 
              id="es_time"
              value={editTime}
              onChange={(ev) => setEditTime(ev.target.value)}
            />
          </div>
        </div>

        <div className={`${modalStyles.footer} ${modalStyles.btns}`}>
          <button 
            type="button"
            onClick={close}
            className={modalStyles.btn_cancel}
          >
            Cancelar
          </button>

          <button 
            type="submit"
            disabled={submitting}
            className={modalStyles.btn_accept}
          >
            {
              submitting
                ? <Loader/>
                : "Editar"
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditEvent
