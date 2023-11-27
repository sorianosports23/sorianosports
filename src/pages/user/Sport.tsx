import Container from "../../components/templates/Container"
import User from "./User"
import { Link, useParams } from "react-router-dom"
import styles from "../../css/sport/Sport.module.css"
import assetsFolder from "../../utils/publicfolder"
import { useEffect, useState } from "react"
import apiGetCityPlace from "../../api/admin/city/getPlace"

type TSportPlace = {
  place: string
  age: string
  teacher: string
  date: string
  time: string
  city: string
  sport: string
}

const SportPlace = ({ place, age, teacher, date, time, city, sport }: TSportPlace) => {
  return (
    <li>
      <div>
        <div>
          <p>Lugar</p>
          <span>{place}</span>
        </div>
        <div>
          <p>Rango de Edad</p>
          <span>{age}</span>
        </div>
        <div>
          <p>Profesor</p>
          <span>{teacher}</span>
        </div>
        <div>
          <p>Dias</p>
          <span>{date}</span>
        </div>
        <div>
          <p>Horario</p>
          <span>{time}</span>
        </div>
        <div>
          <Link to={`/inscripcion?city=${city}&activity=${sport}&place=${place}`}>Inscribirse</Link>
        </div>
      </div>
    </li>
  )
}

const Sport = () => {

  const { city, sport } = useParams()

  const [sportList, setSportList] = useState<TPlace[]>()

  useEffect(() => {
    if (!city || !sport) return
    (async () => {
      const res = await apiGetCityPlace(city as string)
      if (res.status) {
        const data = res.data

        setSportList(data.filter(place => place.sport === sport))
      }
    })()
  }, [city, sport])


  return (
    <User pageTitle="Deportes">
      <Container>
        <div className={styles.title_cont}>
          <div className={styles.title}
            style={{
              backgroundImage: `url(${assetsFolder}/img/cards/${sport}.jpg)`
            }}
          >
            <h1>{sport}</h1>
            <h2>{city}</h2>
          </div>
        </div>        
        <div className={styles.info}>
          <div className={styles.info_cont}>
            <div>
              <h4>Lugares y Horarios</h4>
              <ul>
                {
                  sportList && sportList.map((place, i) => (
                    <SportPlace
                      place={place.place}
                      age={place.age}
                      teacher={place.teacher}
                      date={place.date}
                      time={place.time}
                      city={city as string}
                      sport={sport as string}
                      key={i}
                    />
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </User>
  )
}

export default Sport
