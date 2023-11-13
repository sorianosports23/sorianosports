import { BsTrashFill } from "react-icons/bs"
import styles from "../../../css/admin/page/EditCity.module.css"

type TCity = {
  sport: string
  deleteSport: (sport: string) => void
}

const Sport = ({ sport, deleteSport }: TCity) => { 
  return (
    <div className={styles.sport}>
      <p>{sport}</p>
      <button
        onClick={() => deleteSport(sport)}
      >
        <BsTrashFill/>
      </button>
    </div>
  )
}

export default Sport
