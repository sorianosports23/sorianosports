import { Link } from "react-router-dom"
import styles from "../../assets/css/index/citycarrousel.module.css"

const CITY_URI = `http://${window.location.hostname}:3000/city/`

const citys = [
  "Mercedes",
  "Cardona",
  "Risso",
  "Palmar",
  "Egaña",
  "Dolores",
  "Villa Soriano",
  "Palmitas",
  "Palo Solo",
  "Cañada Nieto",
  "Sacachispas",
  "Santa Catalina",
  "Chacras de Dolores",
  "Agraciada",
  "La Loma",
  "Castillos",
  "La Concordia",
  "El Tala",
  "Colonia Concordia",
  "Perseverano",
  "Lares",
  "Los Arrayanes"
]

const CompCityCarrousel = () => {
  return (
    <div className={styles.carrousel}>
      {
        citys.map((city, i) => (
          <Link to={CITY_URI + city.toLowerCase()} key={i}>
            {city}
          </Link>
        ))
      }
    </div>
  )
}

export default CompCityCarrousel