import { BsCalendar, BsCalendarDate, BsList, BsPenFill, BsPersonFill, BsThreeDots, BsTrashFill } from "react-icons/bs"
import api from "../../../utils/apiRoute"
import styles from "../../../css/admin/news/NewsCard.module.css"
import { useState } from "react"

const NewsCard = ({ id, name, image, author, date }: TNews) => {

  const [showDropdown, setShowDropdown] = useState(false)

  const handlePointerLeave = () => {
    setShowDropdown(false)
  }

  return (
    <div className={styles.card}
      style={{
        zIndex: showDropdown ? 60 : "unset"
      }}
      onPointerLeave={handlePointerLeave}
    >
      <div className={styles.img}>
        <img src={api+image} alt={name} />
      </div>

      <div className={styles.info}>
        <div className={styles.id}>
          <span>{id}</span>
        </div>
        <div className={styles.ot_info}>
          <h3>{name}</h3>
          <span><BsPersonFill/> {author}</span>
          <span><BsCalendarDate/> {date}</span>
        </div>
      </div>

      <div className={styles.btns}>
        <div className={styles.dropdown}>
          <button onClick={() => setShowDropdown(!showDropdown)}><BsThreeDots/></button>

          <ul style={{display: showDropdown ? "flex" : "none"}}>
            <li><button><BsPenFill/> Editar</button></li>
            <li><button><BsTrashFill/> Borrar</button></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
