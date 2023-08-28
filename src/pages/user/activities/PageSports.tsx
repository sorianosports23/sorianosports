import PageUser from "../PageUser"
import styles from "../../../css/activities/sports/PageSports.module.css"
import CompContainer from "../../../components/templates/CompContainer"
import CompSportCard from "../../../components/activities/sports/CompSportCard"
import { useState } from "react"

const sports = {
  ground: [
    { name: "Basquetbol", icon: "basketball.png", background: "basketball.jfif" },
    { name: "Boxeo", icon: "box.png", background: "box.jfif" }
  ],
  water: [
    { name: "Remo", icon: "remo.png", background: "remo.png" }
  ]
}

type TEventType = "ground" | "water" | undefined

const PageSports = () => {

  const [eventTypeSelected, setEventTypeSelected] = useState<TEventType>(undefined)

  return (
    <PageUser>
      <CompContainer>
        <div className={styles.selector}>
          <button 
            className={styles.ground}
            onClick={() => setEventTypeSelected("ground")}
          >
            <div className={styles.icon}>
              <img src={process.env.PUBLIC_URL + "../assets/img/icons/running.png"} alt="person-running" />
            </div>
            <p>
              Deportes terrestres
            </p>
          </button>
          <div className={styles.separator}>
            <img src={process.env.PUBLIC_URL + "../assets/img/secretaria_deportes.svg"} alt="deportes" />
          </div>
          <button 
            className={styles.water}
            onClick={() => setEventTypeSelected("water")}
          >
            <div className={styles.icon}>
              <img src={process.env.PUBLIC_URL + "../assets/img/icons/swimming.png"} alt="person-swimming" />
            </div>
            <p>
              Deportes acuaticos
            </p>
          </button>
        </div>

        <div className={styles.sports}>
          {
            eventTypeSelected 
              && sports[eventTypeSelected as keyof typeof sports].map((sport, i) => (
                <CompSportCard
                  name={sport.name}
                  iconUrlName={sport.icon}
                  backgroundUrlName={sport.background}
                  key={i}
                />
              ))
          }
        </div>
      </CompContainer>
    </PageUser>
  )
}

export default PageSports
