import Admin from "../Admin"
import { FormEvent, useContext, useState } from "react"
import { BsCloudUploadFill } from "react-icons/bs"
import styles from "../../../css/admin/events/AddEvents.module.css"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import SendModal from "../../../components/modal/SendModal"
import apiAdminAddEvent from "../../../api/admin/events/addEvent"

type TInputError = "" | "name" | "place" | "time" | "sport" | "description" | "date_ev"

const AddEvent = () => {

  const { token } = useContext(userSessionContext)

  const [eventName, setEventName] = useState("")
  const [eventPlace, setEventPlace] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventSport, setEventSport] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState({ timeS: "", timeE: "" })

  const [inputError, setInputError] = useState<TInputError>("")
  const [canSubmit, setCanSubmit] = useState(true)

  //!modal
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMsg, setModalMsg] = useState("")
  const [modalOtMsg, setModalOtMsg] = useState("")
  //!

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()

    const eventData: TApiAdminAddEventRequest = {
      token,
      name: eventName,
      place: eventPlace,
      description: eventDescription,
      sport: eventSport,
      date: eventDate,
      time: `${eventTime.timeS} - ${eventTime.timeE}`
    }
    
    setCanSubmit(false)

    const res = await apiAdminAddEvent(eventData)

    if (res.status) {
      setModalMsg("Se añadio el evento")
      setModalOtMsg("")
    } else {
      setModalMsg("No se pudo añadir la noticia")
      setModalOtMsg(res.message)
    }

    setModalOpen(true)
    setCanSubmit(true)
  }

  return (
    <Admin route_title="Añadir evento">
      <form onSubmit={handleSubmit} className={styles.event_info_inputs}>
        <div>
          <label htmlFor="ev_name">Nombre:</label>
          <input 
            type="text" 
            id="ev_name"
            value={eventName}
            onChange={(ev) => setEventName(ev.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ev_place">Lugar:</label>
          <input 
            type="text" 
            id="ev_place"
            value={eventPlace}
            onChange={(ev) => setEventPlace(ev.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ev_date">Fecha:</label>
          <input 
            type="date" 
            id="ev_date"
            value={eventDate}
            onChange={(ev) => setEventDate(ev.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ev_time">Horario:</label>
          <input 
            type="time" 
            id="ev_time"
            value={eventTime.timeS}
            onChange={(ev) => setEventTime(prev => ({...prev, timeS: ev.target.value}))}
          />
          <span>-</span>
          <input 
            type="time"
            value={eventTime.timeE}
            onChange={(ev) => setEventTime(prev => ({...prev, timeE: ev.target.value}))}
          />
        </div>
        <div>
          <label htmlFor="ev_sport">Deporte:</label>
          <input 
            type="text" 
            id="ev_sport"
            value={eventSport}
            onChange={(ev) => setEventSport(ev.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ev_description">Descripción:</label>
          <textarea 
            id="ev_description"
            value={eventDescription}
            onChange={(ev) => setEventDescription(ev.target.value)}
          ></textarea>
        </div>

        <div className={styles.event_send}>
          <button type="submit" disabled={!canSubmit}>
            <BsCloudUploadFill/>
            Publicar
          </button>
        </div>
      </form>

      <SendModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        message={modalMsg}
        otherMessage={modalOtMsg}
      />
    </Admin>
  )
}

export default AddEvent
