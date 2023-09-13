import { useState } from "react"
import styles from "../../css/events/EventCard.module.css"

type TEventProps = {
  dayNumber: number
  day: string
  hour: string
  sportName: string
  place: string
  handleSelectEvent: (event: TEvent) => void
}

const EventCard = (event: TEvent) => {
  
  const { dayNumber, day, hour, sportName, place } = event
  // const { handleSelectEvent, ...eventToHandle } = event

  const [open, setOpen] = useState(false)

  return (
    <div className={styles.event} data-open={open}>
      <div className={styles.show}>
        <div className={styles.date}>
          <span>{dayNumber}</span>
          <span>{day}</span>
          <span>{hour}</span>
        </div>

        <div className={styles.place}>
          <h4>{sportName}</h4>
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
        <h4>{event.name}</h4>
        <p>{event.description}</p>
      </div>

    </div>
  )
}

export default EventCard
