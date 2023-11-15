import { BsPen, BsThreeDots, BsTrash } from "react-icons/bs"
import styles from "../../../css/admin/sports/SportCard.module.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

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

      <div className={styles.btn}>
        <Link to={`/admin/sports/${name}`}>Editar</Link>
      </div>
    </div>
  )
}

export default SportCard
