import User from "../User"
import styles from "../../../css/activities/sports/Sports.module.css"
import Container from "../../../components/templates/Container"
import SportCard from "../../../components/activities/sports/SportCard"
import { useState } from "react"
import assetsFolder from "../../../utils/publicfolder"
import { FaMousePointer } from "react-icons/fa"
import SportSearch from "../../../components/activities/sports/SportSearch"

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

const Sports = () => {

  const [eventTypeSelected, setEventTypeSelected] = useState<TEventType>(undefined)
  const [sportSelected, setSportSelect] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <User>
      <Container>
        <div className={styles.selector}>
          <button 
            className={styles.ground}
            onClick={() => setEventTypeSelected("ground")}
            data-clicked={eventTypeSelected === "ground"}
          >
            <div className={styles.icon}>
              <img src={assetsFolder + "/img/icons/running.png"} alt="person-running" />
            </div>
            <p>
              Deportes terrestres
            </p>

            <div className={styles.click}>
              <FaMousePointer/>
            </div>
          </button>
          <div className={styles.separator}>
            <img src={assetsFolder + "/img/secretaria_deportes.svg"} alt="deportes" />
          </div>
          <button 
            className={styles.water}
            onClick={() => setEventTypeSelected("water")}
            data-clicked={eventTypeSelected === "water"}
          >
            <div className={styles.icon}>
              <img src={assetsFolder + "/img/icons/swimming.png"} alt="person-swimming" />
            </div>
            <p>
              Deportes acuaticos
            </p>

            <div className={styles.click}>
              <FaMousePointer/>
            </div>
          </button>
        </div>

        <div className={styles.sports}>
          {
            eventTypeSelected 
              && sports[eventTypeSelected as keyof typeof sports].map((sport, i) => (
                <SportCard
                  name={sport.name}
                  iconUrlName={sport.icon}
                  backgroundUrlName={sport.background}
                  key={i}
                  select={() => {
                    setSportSelect(sport.name)
                    setModalOpen(true)
                  }}
                />
              ))
          }
        </div>
      </Container>

      <SportSearch
        open={modalOpen}
        sport={sportSelected}
        close={() => setModalOpen(false)}
      />
    </User>
  )
}

export default Sports
