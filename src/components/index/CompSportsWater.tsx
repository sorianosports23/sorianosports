import { BsQuestionCircle } from "react-icons/bs"
import styles from "../../css/index/sportswater.module.css"
import { useState } from "react"

const CompSportsWater = () => {

  const [listOpen, setListOpen] = useState(false)

  return (
    <div 
      className={styles.sportsmain}
      style={{
        height: listOpen ? "40rem" : "25rem"
      }}
    >
      <div className={styles["sportsmain_main"]}>
        <div className={styles.textDiv}>
          <div className={styles.img}>
            <img src={process.env.PUBLIC_URL + "/assets/img/sportswater.jfif"} alt="sports-ground" />
          </div>
          <div>
            <h2>
              <span>Deportes</span>
              <span>Actividades</span>
              <span>Acuaticas</span>
            </h2>
            <p>Recuerda hacer las cosas que disfrutas.</p>

            <button
              onClick={() => setListOpen(!listOpen)}
            >
            {
              listOpen ? "Cerrar" : "Abrir"
            }
          </button>
          </div>
        </div>

        <div className={styles.circle}></div>
      </div>

      <div className={styles.list}>
        <ul>
          <li>
            <div className={styles.icon}>
              <BsQuestionCircle/>
            </div>
            <div className={styles.title}>
              ????????
            </div>
          </li>
          <li>
            <div className={styles.icon}>
              <BsQuestionCircle/>              
            </div>
            <div className={styles.title}>
              ????????
            </div>
          </li>
        </ul>
      </div>
    </div>
  )  
}

export default CompSportsWater
