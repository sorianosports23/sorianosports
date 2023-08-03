import styles from "../../css/events/CompEvent.module.css"

type TEventProps = {
  dayNumber: number,
  day: string,
  hour: string
  sportName: string,
  place: string
}

const CompEvent = (event: TEventProps) => {
  
  const { dayNumber, day, hour, sportName, place } = event
  
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
        <button onClick={() => console.log(event)}>Ver informacion</button>
      </div>

    </div>
  )
}

export default CompEvent
