import SportCard from "../../components/admin/sports/SportCard"
import AdminSportsMenu from "../../components/menu/AdminSportsMenu"
import styles from "../../css/admin/sports/Sports.module.css"
import Admin from "./Admin"
import { sportList } from "../../utils/sportList"
import { useCallback, useState } from "react"

const cities = [
  "Mercedes",
  "Dolores",
  "Risso",
  "Villa Soriano",
  "Palmitas",
  "Palmar",
  "Jose.E.Rodo",
  "Egaña",
  "Cardona",
  "Santa Catalina",
  "Lares",
  "Perseverano",
  "Sacachispas",
  "La Agraciada",
  "El Tala",
  "La Loma",
  "Cañada de Nieto",
  "Colonia Concordia",
  "Castillos"

]

const Sports = () => {

  const [sportsArr, setSportsArr] = useState<string[]>([])

  const handleChangeSports = useCallback((sports: string[]) => setSportsArr(sports), [])

  return (
    <Admin route_title="Ciudades">
      <AdminSportsMenu sports={sportList} setSports={handleChangeSports}/>

      <div className={styles.sports}>
        {
          cities.map((sport, i) => (
            <SportCard name={sport} key={i}/>
            ))
        }
      </div>
    </Admin>
  )
}

export default Sports
