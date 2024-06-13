import { Link } from "react-router-dom"
import styles from "../../css/events/NewEventCard.module.css"
import api from "../../api/apiRoute"

const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

const NewEventCard = ({ id, name, place, sport, description, date_ev, time }: TEvent) => {
  const date = date_ev.split('-')

  const month = months[Number(date[1])]

  return (
    <div className={styles.cont}>
      <div className={styles.img}>
        <div>
          <img src={`${api}/events/getImage.php?id=${id}`} alt="event-img" />
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.name}>
          <h3>{name}</h3>
          <p>
            {
              description
            }
          </p>
        </div>

        <div className={styles.date}>
          <div>
            <p>{`${date[2]} ${month} ${date[0]}`}</p>
            <p>{time}</p>
            <p>{place}</p>
            <p>{sport}</p>
          </div>

          <div className={styles.btn}>
            <Link to={`/evento/${id}`}>Ver más</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewEventCard
