import styles from "../../css/events/EventCard.module.css"

type TEventProps = {
  dayNumber: number
  day: string
  hour: string
  sportName: string
  place: string
  handleSelectEvent: (event: TEvent) => void
}

const EventCard = (event: TEventProps) => {
  
  const { dayNumber, day, hour, sportName, place } = event
  const { handleSelectEvent, ...eventToHandle } = event

  return (
    <div className={styles.event}>
      <div className={styles.date}>
        <span>{dayNumber}</span>
        <span>{day}</span>
        <span>{hour}</span>
      </div>

      <div className={styles.place}>
        <h4>{sportName}</h4>
        <p>{place}</p>
        <button onClick={() => handleSelectEvent(eventToHandle as TEvent)}>Ver informacion</button>
      </div>

    </div>
  )
}

export default EventCard
