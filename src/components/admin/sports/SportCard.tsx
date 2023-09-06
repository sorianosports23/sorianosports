import { BsPen, BsThreeDots, BsTrash } from "react-icons/bs"
import styles from "../../../css/admin/sports/SportCard.module.css"
import { useEffect, useState } from "react"

type TSportCardProps = {
  name: string
}

const SportCard = ({ name }: TSportCardProps) => {

  const [ dropdownShown, setDropdownShown ] = useState(false)

  const handleMouseLeave = () => {
    setDropdownShown(false)
  }

  return (
    <div onPointerLeave={handleMouseLeave} className={styles.card} style={{zIndex: dropdownShown ? 10 : "unset"}}>
      <p>{name}</p>

      <div className={styles.dropdown}>
        <button onClick={() => setDropdownShown(!dropdownShown)}>
          <BsThreeDots/>
        </button>
      
        <ul className={styles.dropdown_menu} style={{transform: `translateY(${2.3 * 2}rem)`, display: dropdownShown ? "flex" : "none"}}>
          <li><button><BsTrash/> Borrar</button></li>
          <li><button><BsPen/> Editar</button></li>
        </ul>
      </div>
    </div>
  )
}

export default SportCard
