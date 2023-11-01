import { useState } from "react"
import styles from "../../css/events/EventCard.module.css"

const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

const EventCard = ({ name, place, sport, description, date_ev }: TEvent) => {
  
  const [open, setOpen] = useState(false)
  const date = new Date(`${date_ev}GMT-3`)

  const day = days[date.getDay()]
  const dayNumber = date.getDay() + 1

  const month = months[date.getMonth()]

  return (
    <div className={styles.event} data-open={open}>
      <div className={styles.show}>
        <div className={styles.date}>
          <span>{day}</span>
          <span>{dayNumber}</span>
          <span>{month}</span>
          <span>{date.getFullYear()}</span>
        </div>

        <div className={styles.place}>
          <h4>{sport}</h4>
          <p>{place}</p>
          <button onClick={() => setOpen(!open)}>
            {
              open 
                ? "Ocultar"
                : "Ver información"
            }
          </button>
        </div>
      </div>

      <div className={styles.info}>
        <h4>{name}</h4>
        <p>{description}</p>
      </div>

    </div>
  )
}

export default EventCard
