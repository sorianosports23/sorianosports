import { FaBasketballBall, FaVolleyballBall } from "react-icons/fa"
import styles from "../../css/index/sportsground.module.css"
import { useState } from "react"

const CompSportsGround = () => {

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
          <div>
            <h2>
              <span>Deportes</span>
              <span>Actividades</span>
              <span>En tierra</span>
            </h2>
            <p>Simplemente juega. Diviértete. Disfruta el juego.</p>
              <button
                onClick={() => setListOpen(!listOpen)}
              >
              {
                listOpen ? "Cerrar" : "Abrir"
              }
            </button>
          </div>
          <div className={styles.img}>
            <img src={process.env.PUBLIC_URL + "/assets/img/sportsground.jpg"} alt="sports-ground" />
          </div>
        </div>
        
        <div className={styles.circle}></div>
      </div>
      
      <div className={styles.list}>
        <ul>
          <li>
            <div className={styles.icon}>
              <FaVolleyballBall/>
            </div>
            <div className={styles.title}>
              Voley
            </div>
          </li>
          <li>
            <div className={styles.icon}>
              <FaBasketballBall/>
            </div>
            <div className={styles.title}>
              Basquetbol
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CompSportsGround
