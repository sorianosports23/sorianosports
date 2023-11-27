import SportCard from "../../components/admin/sports/SportCard"
import AdminSportsMenu from "../../components/menu/AdminSportsMenu"
import styles from "../../css/admin/sports/Sports.module.css"
import Admin from "./Admin"
import { useCallback, useState } from "react"
import cityList from "../../utils/cityList"

const Sports = () => {

  const [cityToShow, setCityToShow] = useState<string[]>([])

  const handleChangeCities = useCallback((sports: string[]) => setCityToShow(sports), [])

  return (
    <Admin route_title="Ciudades">
      <AdminSportsMenu sports={cityList} setSports={handleChangeCities}/>

      <div className={styles.sports}>
        {
        cityToShow.map((sport, i) => (
          <SportCard name={sport} key={i}/>
        ))
        }
      </div>
    </Admin>
  )
}

export default Sports
