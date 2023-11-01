import { BsCalendarDate, BsThreeDots, BsPenFill, BsTrashFill } from "react-icons/bs"
import styles from "../../../css/admin/events/EventCard.module.css"
import { useState } from "react"

type TEventCardProps = {
  data: TEvent
  handleEditButton: () => void
  handleDeleteButton: () => void
}

const EventCard = ({ data, handleEditButton, handleDeleteButton }: TEventCardProps) => {
  
  const { id, name, place, time, sport, date_ev } = data

  const [showDropdown, setShowDropdown] = useState(false)
  
  return (
    <div className={styles.entry}>
      <div className={styles.id}>
        <span>{id}</span>
      </div>

      <div className={styles.info}>
        <h4>{name}</h4>
        <h5>{place}</h5>
      </div>

      <div className={styles.more_info}>
        <h4>{sport}</h4>
        <h5><BsCalendarDate/> {date_ev}</h5>
        <h5>{time}</h5>
      </div>

      <div className={styles.btns}>
        <div className={styles.dropdown}>
          <button onClick={() => setShowDropdown(!showDropdown)}><BsThreeDots/></button>

          <ul style={{display: showDropdown ? "flex" : "none"}}>
            <li>
              <button
                onClick={() => {
                  handleEditButton()
                }}
              >
                <BsPenFill/> Editar
              </button>
            </li>
            <li>
              <button
                onClick={() => handleDeleteButton()}
              >
                <BsTrashFill/> Borrar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EventCard
