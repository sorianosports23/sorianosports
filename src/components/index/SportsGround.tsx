import { FaBasketballBall, FaVolleyballBall } from "react-icons/fa"
import styles from "../../css/index/sportsground.module.css"
import { useEffect, useRef, useState } from "react"
import assetsFolder from "../../utils/publicfolder"

type TSportCardProps = {
  sport: string
  img: string
}

const SportCard = ({ sport, img }: TSportCardProps) => {
  return (
    <div className={styles.sport_card}
      style={{
        backgroundImage: `url(${assetsFolder}/img/cards/${img})`
      }}
    >
      <button>Inscribirme</button>
      <p>{sport}</p>
    </div>
  )
}

const SportsGround = () => {

  const [listOpen, setListOpen] = useState(false)
  const sportsList = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log(sportsList.current?.children.length)
    if (sportsList.current) {
      console.log(sportsList.current.getBoundingClientRect().width)
      console.log(sportsList.current.children.length * 144)
      const cardsWidth = sportsList.current.children.length * 144
      const cardsRect = sportsList.current.getBoundingClientRect()

      if (cardsWidth > cardsRect.width) {
        sportsList.current.style.justifyContent = "flex-start"
      } else {
        sportsList.current.style.justifyContent = "center"
      }
    }
  }, [])

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
              <span>Actividades</span>
              <span>Deportivas</span>
              <span>Anuales</span>
            </h2>
              <p>¡El deporte es vida... Vivi el deporte!</p>
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
      
      <div className={styles.list} ref={sportsList}>
        <SportCard
          sport="Basquetbol"
          img="basketball.jfif"
        />
        <SportCard
          sport="Boxeo"
          img="box.jfif"
        />
        <SportCard
          sport="Remo"
          img="remo.png"
        />
      </div>
    </div>
  )
}

export default SportsGround
