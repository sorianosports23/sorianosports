import { BsTrashFill } from "react-icons/bs"
import styles from "../../../css/admin/page/EditCity.module.css"

type TCity = {
  sport: string
  type: "year" | "summer"
  deleteSport: (sport: string, type: "summer" | "year") => void
}

const Sport = ({ sport, type, deleteSport }: TCity) => { 
  return (
    <div className={styles.sport}>
      <p>{sport}</p>
      <p>{type === "summer" ? "Verano" : "Anual"}</p>
      <button
        onClick={() => deleteSport(sport, type)}
      >
        <BsTrashFill/>
      </button>
    </div>
  )
}

export default Sport
