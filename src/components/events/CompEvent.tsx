import styles from "../../css/events/CompEvent.module.css"

type TEventProps = {
  dayNumber: number,
  day: string,
  hour: string
  sportName: string,
  place: string
}

const CompEvent = ({ dayNumber, day, hour, sportName, place }: TEventProps) => {
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
      </div>
    </div>
  )
}

export default CompEvent
