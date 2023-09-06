import SportCard from "../../components/admin/sports/SportCard"
import AdminSportsMenu from "../../components/menu/AdminSportsMenu"
import styles from "../../css/admin/sports/Sports.module.css"
import Admin from "./Admin"
import { sportList } from "../../utils/sportList"
import { useCallback, useState } from "react"

const Sports = () => {

  const [sportsArr, setSportsArr] = useState<string[]>([])

  const handleChangeSports = useCallback((sports: string[]) => setSportsArr(sports), [])

  return (
    <Admin route_title="Deportes">
      <AdminSportsMenu sports={sportList} setSports={handleChangeSports}/>

      <div className={styles.sports}>
        {
          sportsArr.length > 0
            ? sportsArr.map((sport, i) => (
              <SportCard name={sport} key={i}/>
              ))
            : <p>Deporte no encontrado</p>
        }
      </div>
    </Admin>
  )
}

export default Sports
