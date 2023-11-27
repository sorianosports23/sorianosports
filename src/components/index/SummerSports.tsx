import styles from "../../css/index/sportsground.module.css"
import { useEffect, useRef, useState } from "react"
import assetsFolder from "../../utils/publicfolder"
import SportInscription from "./SportInscription"
import apiGetSports from "../../api/page/sports/getSports"
import apiGetCityFromSport from "../../api/page/sports/getCityFromSport"

type TSportCardProps = {
  sport: string
  img: string
  open: () => void
}

const SportCard = ({ sport, img, open }: TSportCardProps) => {
  return (
    <div className={styles.sport_card}
      style={{
        backgroundImage: `url(${assetsFolder}/img/cards/${img})`
      }}
    >
      <button onClick={open}>Inscribirme</button>
      <p>{sport}</p>
    </div>
  )
}

const SummerSports = () => {

  const [listOpen, setListOpen] = useState(false)
  const sportsList = useRef<HTMLDivElement>(null)

  const [modalSport, setModalSport] = useState("")
  const [modalSportOpen, setModalSportOpen] = useState(false)

  const [sportsSummer, setSportsSummer] = useState<string[]>([])
  const [modalCities, setModalCities] = useState<string[]>([])

  const handleSelectSport = async (sport: string) => {
    setModalSport(sport)

    const res = await apiGetCityFromSport(sport)
    if (res.data) {
      setModalCities(res.data)
      setModalSportOpen(true)
    }
  }

  useEffect(() => {
    (async () => {
      const res = await apiGetSports()
      if (res.data) {
        const summerSports = res.data.filter(list => list.type === "summer")
        let sports: string[] = []
        summerSports.forEach(sport => {
          if (!sports.includes(sport.name)) sports.push(sport.name)
        })
        setSportsSummer(sports)
      }
    })()
  }, [])

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
    <>

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
              <span style={{fontFamily:"Facon"}}>Actividades</span>
              <span style={{fontFamily:"Facon"}}>De</span>
              <span style={{fontFamily:"Facon"}}>Verano</span>
            </h2>
              <h3 className={styles.subtitle_summer}>¡El deporte es vida... Vivi el deporte!</h3>
              <button
                onClick={() => setListOpen(!listOpen)}
              >
              {
                listOpen ? "Cerrar" : "Abrir"
              }
            </button>

           
          </div>
          <div className={styles.img}>
            <img src={assetsFolder + "/img/summersports.jpg"} alt="sports-summer" />
          </div>
        </div>
        
        <div className={styles.circle} data-ground-open={listOpen}></div>
      </div>
      
      <div className={styles.list} ref={sportsList}>
        {
          sportsSummer.map((sport, i) => (
            <SportCard
              sport={sport}
              img={`${sport}.jpg`}
              open={() => handleSelectSport(sport)}
              key={i}
            />
          ))
        }
      </div>
    </div>

    <SportInscription
      sport={modalSport}
      open={modalSportOpen}
      close={() => setModalSportOpen(false)}
      cities={modalCities}
    />

    </>
  )
}

export default SummerSports
