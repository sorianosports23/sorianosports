import Admin from "../Admin"
import { FormEvent } from "react"
import { BsCloudUploadFill } from "react-icons/bs"
import styles from "../../../css/admin/events/AddEvents.module.css"

const AddEvent = () => {

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
  }

  return (
    <Admin route_title="Añadir evento">
      <form onSubmit={handleSubmit} className={styles.event_info_inputs}>
        <div>
          <label htmlFor="ev_name">Nombre:</label>
          <input 
            type="text" 
            id="ev_name"
          />
        </div>
        <div>
          <label htmlFor="ev_place">Lugar:</label>
          <input 
            type="text" 
            id="ev_place"
          />
        </div>
        <div>
          <label htmlFor="ev_date">Fecha:</label>
          <input 
            type="date" 
            id="ev_date"
          />
        </div>
        <div>
          <label htmlFor="ev_time">Horario:</label>
          <input 
            type="time" 
            id="ev_time"
          />
          <span>-</span>
          <input 
            type="time" 
          />
        </div>
        <div>
          <label htmlFor="ev_sport">Deporte:</label>
          <input 
            type="text" 
            id="ev_sport"
          />
        </div>
        <div>
          <label htmlFor="ev_description">Descripción:</label>
          <textarea id="ev_description"></textarea>
        </div>

        <div className={styles.event_send}>
          <button type="submit">
            <BsCloudUploadFill/>
            Publicar
          </button>
        </div>
      </form>
    </Admin>
  )
}

export default AddEvent
