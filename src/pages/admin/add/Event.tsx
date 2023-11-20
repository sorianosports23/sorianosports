import Admin from "../Admin"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { BsCloudUploadFill, BsUpload } from "react-icons/bs"
import styles from "../../../css/admin/events/AddEvents.module.css"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import SendModal from "../../../components/modal/SendModal"
import apiAdminAddEvent from "../../../api/admin/events/addEvent"

type TInputError = "" | "name" | "place" | "time" | "sport" | "description" | "date_ev" | "image"

const AddEvent = () => {

  const { token } = useContext(userSessionContext)

  const [eventName, setEventName] = useState("")
  const [eventPlace, setEventPlace] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventSport, setEventSport] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState({ timeS: "", timeE: "" })
  const [eventImage, setEventImage] = useState<File | null>(null)

  const [inputError, setInputError] = useState<TInputError>("")
  const [canSubmit, setCanSubmit] = useState(true)

  //!modal
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMsg, setModalMsg] = useState("")
  const [modalOtMsg, setModalOtMsg] = useState("")
  //!

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()

    if (!eventImage) {
      setInputError("image")
    }

    const eventData: TApiAdminAddEventRequest = {
      token,
      name: eventName,
      place: eventPlace,
      description: eventDescription,
      sport: eventSport,
      date: eventDate,
      time: `${eventTime.timeS} - ${eventTime.timeE}`,
      image: eventImage as File
    }
    
    setCanSubmit(false)

    const res = await apiAdminAddEvent(eventData)

    if (res.status) {
      setModalMsg("Se añadio el evento")
      setModalOtMsg("")
    } else {
      if (res.input) {
        setInputError(res.input)
      } else {
        setModalMsg("No se pudo añadir la noticia")
        setModalOtMsg(res.message)
      }
    }

    if (!res.input) {
      setModalOpen(true)
    }
    
    setCanSubmit(true)
  }

  const handleUploadImage = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files[0]) {
      setEventImage(ev.target.files[0])
      setInputError("")
    }
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
            onChange={(ev) => {
              setEventName(ev.target.value)
              setInputError("")
            }}
            required
            data-invalid={inputError === "name"}
          />
        </div>
        <div>
          <label htmlFor="ev_place">Lugar:</label>
          <input 
            type="text" 
            id="ev_place"
            value={eventPlace}
            onChange={(ev) => {
              setEventPlace(ev.target.value)
              setInputError("")
            }}
            required
            data-invalid={inputError === "place"}
          />
        </div>
        <div>
          <label htmlFor="ev_date">Fecha:</label>
          <input 
            type="date" 
            id="ev_date"
            value={eventDate}
            onChange={(ev) => {
              setEventDate(ev.target.value)
              setInputError("")
            }}
            required
            data-invalid={inputError === "date_ev"}
          />
        </div>
        <div>
          <label htmlFor="ev_time">Horario:</label>
          <input 
            type="time" 
            id="ev_time"
            value={eventTime.timeS}
            onChange={(ev) => {
              setEventTime(prev => ({...prev, timeS: ev.target.value}))
              setInputError("")
            }}
            required
            data-invalid={inputError === "time"}
          />
          <span>-</span>
          <input 
            type="time"
            value={eventTime.timeE}
            onChange={(ev) => {
              setEventTime(prev => ({...prev, timeE: ev.target.value}))
              setInputError("")
            }}
            required
            data-invalid={inputError === "time"}
          />
        </div>
        <div>
          <label htmlFor="ev_sport">Deporte:</label>
          <input 
            type="text" 
            id="ev_sport"
            value={eventSport}
            onChange={(ev) => {
              setEventSport(ev.target.value)
              setInputError("")
            }}
            required
            data-invalid={inputError === "sport"}
          />
        </div>
        <div>
          <label htmlFor="ev_description">Descripción:</label>
          <textarea 
            id="ev_description"
            value={eventDescription}
            onChange={(ev) => {
              setEventDescription(ev.target.value)
              setInputError("")
            }}
            required
            data-invalid={inputError === "description"}
          ></textarea>
        </div>

        <div className={styles.upload_img}>
          <label 
            htmlFor="ev_image"
            data-invalid={inputError === "image" && "true"}
          >
            <BsUpload/> Subir imagen
          </label>

          <p>
            {
              eventImage && eventImage.name
            }
          </p>

          <input 
            type="file" 
            id="ev_image" 
            className="hidden"
            onChange={handleUploadImage}
          />
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
