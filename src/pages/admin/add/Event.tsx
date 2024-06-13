import Admin from "../Admin"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { BsChevronDown, BsCloudUploadFill, BsUpload } from "react-icons/bs"
import styles from "../../../css/admin/events/AddEvents.module.css"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import SendModal from "../../../components/modal/SendModal"
import apiAdminAddEvent from "../../../api/admin/events/addEvent"
import cityList from "../../../utils/cityList"
import TimeRangePicker from "@wojtekmaj/react-timerange-picker"

const AddEvent = () => {

  const { token } = useContext(userSessionContext)

  const [eventName, setEventName] = useState("")
  const [eventPlace, setEventPlace] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventSport, setEventSport] = useState("")
  const [eventDate, setEventDate] = useState("")
  // const [eventTime, setEventTime] = useState<TTimePickerValue>(['00:00', '00:00'])
  const [eventTime1, setEventTime1] = useState("00")
  const [eventTime2, setEventTime2] = useState("00")
  const [eventTime3, setEventTime3] = useState("00")
  const [eventTime4, setEventTime4] = useState("00")
  const [eventImage, setEventImage] = useState<File | null>(null)
  const [eventCity, setEventCity] = useState("")
  const [eventRules, setEventRules] = useState("")
  const [eventLongDesc, setEventLongDesc] = useState("")
  const [eventExtraInfo, setEventExtraInfo] = useState("")
  const [eventUrl, setEventUrl] = useState("")
  const [eventGreat, setEventGreat] = useState(0)

  const [inputError, setInputError] = useState<IApiAdminModifyEventResponse["input"] | undefined>(undefined)
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

    const time = `${eventTime1}:${eventTime2} - ${eventTime3}:${eventTime4}`

    const eventData: TApiAdminAddEventRequest = {
      token,
      name: eventName,
      place: eventPlace,
      description: eventDescription,
      sport: eventSport,
      date: eventDate,
      time,
      image: eventImage as File,
      city: eventCity,
      extraInfo: eventExtraInfo,
      inscriptionInfo: eventLongDesc,
      rules: eventRules,
      urlUbi: eventUrl,
      greatevent: eventGreat as TTinyInt
    }
    
    setCanSubmit(false)

    const res = await apiAdminAddEvent(eventData)

    if (res.status) {
      setModalMsg("Se añadio el evento")
      setModalOtMsg("")
    } else {
        setModalMsg("No se pudo añadir el evento")
        setModalOtMsg(res.message)
    }
    setModalOpen(true)
    
    setCanSubmit(true)
  }

  const handleUploadImage = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files[0]) {
      setEventImage(ev.target.files[0])
      setInputError(undefined)
    }
  }

  const RequiredString = () => <span style={{color: '#f00',fontSize: '1.2em'}}>*</span>

  return (
    <Admin route_title="Añadir evento">
      <form onSubmit={handleSubmit} className={styles.event_info_inputs}>
        <div>
          <label htmlFor="ev_name">Nombre: {<RequiredString/>}</label>
          <input 
            type="text" 
            id="ev_name"
            value={eventName}
            onChange={(ev) => {
              setEventName(ev.target.value)
              setInputError(undefined)
            }}
            required
            data-invalid={inputError === "name"}
          />
        </div>
        <div>
          <label htmlFor="ev_city">Ciudad: {<RequiredString/>}</label>
          <div className="custom_select">
            <select
              value={eventCity}
              onChange={(ev) => setEventCity(ev.target.value)}
            >
              <option value="">Seleccionar</option>
              {
                cityList.map((city, i) => (
                  <option key={i} value={city}>{city}</option>
                ))
              }
            </select>
            <div>
              <BsChevronDown/>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="ev_place">Lugar: {<RequiredString/>}</label>
          <input 
            type="text" 
            id="ev_place"
            value={eventPlace}
            onChange={(ev) => {
              setEventPlace(ev.target.value)
              setInputError(undefined)
            }}
            required
            data-invalid={inputError === "place"}
          />
        </div>
        <div>
          <label htmlFor="ev_date">Fecha: {<RequiredString/>}</label>
          <input 
            type="date" 
            id="ev_date"
            value={eventDate}
            onChange={(ev) => {
              setEventDate(ev.target.value)
              setInputError(undefined)
            }}
            required
            data-invalid={inputError === "date_ev"}
          />
        </div>
        <div className={styles.timerange}>
          <label htmlFor="ev_time">Horario: {<RequiredString/>}</label>
          {/* <TimeRangePicker
            locale="es-UY"
            value={eventTime}
            onChange={(ev) => setEventTime(ev as typeof eventTime)}
            disableClock
            rangeDivider="-"
          /> */}
          <div>

            <input 
              type="text" 
              value={eventTime1}
              onChange={(ev) => setEventTime1(ev.target.value)}
            />
            :
            <input 
              type="text" 
              value={eventTime2}
              onChange={(ev) => setEventTime2(ev.target.value)}
            />
            -
            <input 
              type="text" 
              value={eventTime3}
              onChange={(ev) => setEventTime3(ev.target.value)}
            />
            :
            <input 
              type="text" 
              value={eventTime4}
              onChange={(ev) => setEventTime4(ev.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="ev_sport">Deporte: {<RequiredString/>}</label>
          <input 
            type="text" 
            id="ev_sport"
            value={eventSport}
            onChange={(ev) => {
              setEventSport(ev.target.value)
              setInputError(undefined)
            }}
            required
            data-invalid={inputError === "sport"}
          />
        </div>
        <div>
          <label htmlFor="ev_description">Descripción: {<RequiredString/>}</label>
          <textarea 
            id="ev_description"
            value={eventDescription}
            onChange={(ev) => {
              setEventDescription(ev.target.value)
              setInputError(undefined)
            }}
            required
            data-invalid={inputError === "description"}
          ></textarea>
        </div>

        <div>
          <label htmlFor="ev_rules">Reglas:</label>
          <textarea id="ev_rules"
            value={eventRules}
            onChange={(ev) => setEventRules(ev.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="ev_desc">Información sobre inscripción:</label>
          <textarea id="ev_desc"
            value={eventLongDesc}
            onChange={(ev) => setEventLongDesc(ev.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="ev_extra_info">Información extra:</label>
          <textarea id="ev_extra_info"
            value={eventExtraInfo}
            onChange={(ev) => setEventExtraInfo(ev.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="ev_url">URL Google Maps:</label>
          <input 
            type="text" 
            value={eventUrl}
            onChange={(ev) => setEventUrl(ev.target.value)}
          />
        </div>

        <div>
          <label htmlFor="ev_great">Marcar como gran evento</label>
          <input 
            type="checkbox"
            value={eventGreat}
            checked={eventGreat === 1}
            onChange={() => setEventGreat(prev => prev === 1 ? 0 : 1)}
            id="ev_great"
          />
        </div>

        <div className={styles.upload_img}>
          <label 
            htmlFor="ev_image"
            data-invalid={inputError === "image" && "true"}
          >
            <BsUpload/> Subir imagen {<RequiredString/>}
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
