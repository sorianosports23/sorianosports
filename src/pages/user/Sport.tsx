import Container from "../../components/templates/Container"
import User from "./User"
import { Link, useParams } from "react-router-dom"
import styles from "../../css/sport/Sport.module.css"
import assetsFolder from "../../utils/publicfolder"
import { sportIcon } from "../../utils/sportList"
import { useState } from "react"
import { BsChevronUp } from "react-icons/bs"

type TInfoOnScreen = "Lugares" | "Eventos"

type TSportPlace = {
  place: string
  teacher: string
  time: string
}

const SportPlace = ({ place, teacher, time }: TSportPlace) => {
  return (
    <li>
      <div>
        <div>
          <p>Lugar</p>
          <span>{place}</span>
        </div>
        <div>
          <p>Profesor</p>
          <span>{teacher}</span>
        </div>
        <div>
          <p>Horario</p>
          <span>{time}</span>
        </div>
        <div>
          <Link to="/inscripcion">Inscribirse</Link>
        </div>
      </div>
    </li>
  )
}

const Sport = () => {

  const { city, sport } = useParams()

  const icon = sportIcon[sport as keyof typeof sportIcon]
  const urlIcon = icon 
    ? `${assetsFolder}/img/icons/sports/${icon}`
    : `${assetsFolder}/img/img_placeholder.png`

  const [infoOnScreen, setInfoOnScreen] = useState<TInfoOnScreen>("Lugares")


  return (
    <User>
      <Container>
        <div className={styles.title_cont}>
          <div className={styles.title}>
            <h1>{sport}</h1>
            <h2>{city}</h2>
          </div>

          <div className={styles.title_img}>
            <img src={urlIcon} alt="" />
          </div>
        </div>
{/* 
        <div className={styles.infoSelector}>
          <button
            className={infoOnScreen === "Lugares" ? styles.on_screen : undefined}
            onClick={() => setInfoOnScreen("Lugares")}
          >
            Lugares
          </button>

          <div className={styles.info_divisor}>
            <BsChevronUp
              style={{
                transform: `rotate(${
                  infoOnScreen === "Lugares" ? "-90" : "90"
                }deg)`
              }}
            />
          </div>

          <button
            className={infoOnScreen === "Eventos" ? styles.on_screen : undefined}
            onClick={() => setInfoOnScreen("Eventos")}
          >
            Eventos
          </button>
        </div> */}
        
        <div className={styles.info}>
          <div className={styles.info_cont}>
            <div
              style={{
                transform: `
                  ${infoOnScreen === "Lugares" ? "translateY(0)" : "translateY(-100%)"}
                `
              }}
            >
              <h4>Lugares</h4>
              <ul>
                <SportPlace place="Club Remeros Mercedes" teacher="Profesor X" time="16:00 - 20:00"/>
                <SportPlace place="Plaza Deportes" teacher="Profesor XX" time="15:00 - 17:00"/>
                <SportPlace place="Plaza Deportes" teacher="Profesor XX" time="15:00 - 17:00"/>
                <SportPlace place="Plaza Deportes" teacher="Profesor XX" time="15:00 - 17:00"/>
                <SportPlace place="Plaza Deportes" teacher="Profesor XX" time="15:00 - 17:00"/>
                <SportPlace place="Plaza Deportes" teacher="Profesor XX" time="15:00 - 17:00"/>
                <SportPlace place="Plaza Deportes" teacher="Profesor XX" time="15:00 - 17:00"/>
                <SportPlace place="Plaza Deportes" teacher="Profesor XX" time="15:00 - 17:00"/>
              </ul>
            </div>

            {/* <div
              style={{
                transform: `
                  ${infoOnScreen === "Eventos" ? "translateY(-100%)" : "translateY(0)"}
                `
              }}
            >
              <h4>Eventos</h4>
              <ul>
                <li>
                  <Link to="/">Evento 1</Link>
                </li>
                <li>
                  <Link to="/">Evento 2</Link>
                </li>
                <li>
                  <Link to="/">Evento 3</Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </Container>
    </User>
  )
}

export default Sport
