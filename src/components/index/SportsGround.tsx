import { FaBasketballBall, FaVolleyballBall } from "react-icons/fa"
import styles from "../../css/index/sportsground.module.css"
import { useState } from "react"
import assetsFolder from "../../utils/publicfolder"

const SportsGround = () => {

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
            <h2 >
              <span style={{fontFamily:"Facon"}}>Actividades</span>
              <span style={{fontFamily:"Facon"}}>Deportivas</span>
              <span style={{fontFamily:"Facon"}}>Anuales</span>
            </h2>
              <h3>¡El deporte es vida... Vivi el deporte!</h3>
              <button
                onClick={() => setListOpen(!listOpen)}
              >
              {
                listOpen ? "Cerrar" : "Abrir"
              }
            </button>

           
          </div>
          <div className={styles.img}>
            <img src={assetsFolder + "/img/sportsground.jpg"} alt="sports-ground" />
          </div>
        </div>
        
        <div className={styles.circle} data-ground-open={listOpen}></div>
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

export default SportsGround
