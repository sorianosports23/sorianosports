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
      <p>{sport}</p>
      <button onClick={open}>Inscribirme</button>
    </div>
  )
}

const YearSports = () => {

  const [listOpen, setListOpen] = useState(false)
  const sportsList = useRef<HTMLDivElement>(null)

  const [sportsYear, setSportsYear] = useState<string[]>([])
  const [modalCities, setModalCities] = useState<string[]>([])

  useEffect(() => {
    (async () => {
      const res = await apiGetSports()
      if (res.status && res.data) {
        const yearSports = res.data.filter(list => list.type === "year")
        let sports: string[] = []
        yearSports.forEach(sport => {
          if (!sports.includes(sport.name)) sports.push(sport.name)
        })
        setSportsYear(sports)
      }
    })()
  }, [])

  const [modalSport, setModalSport] = useState("")
  const [modalSportOpen, setModalSportOpen] = useState(false)

  const handleSelectSport = async (sport: string) => {
    setModalSport(sport)

    const res = await apiGetCityFromSport(sport)
    if (res.data) {
      setModalCities(res.data)
      setModalSportOpen(true)
    }

  }

  useEffect(() => {
    if (sportsList.current) {
      const cardsWidth = Array.from(sportsList.current.children).length * 144
      const cardsRect = sportsList.current.getBoundingClientRect()
      console.log(cardsWidth)
      console.log(cardsRect)


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
           

           <h2 className={styles.tit_Anual_sport}>
              <span style={{fontFamily:"Facon"}}>Actividades</span>
              <span style={{fontFamily:"Facon"}}>Deportivas</span>
              <span style={{fontFamily:"Facon"}}>Anuales</span>
            </h2>
             <h3 style={{fontSize:"medium"}}>¡El deporte es vida... Vivi el deporte!</h3>
          

          
          
              <button
                onClick={() => setListOpen(!listOpen)}
              >
              {
                listOpen ? "Cerrar" : "Abrir"
              }
            </button>

           
          </div>
          <div className={styles.img}>
            <img src={assetsFolder + "/img/yearsports.jpg"} alt="sports-ground" />
          </div>
        </div>
        
        <div className={styles.circle} data-ground-open={listOpen}></div>
      </div>
      
      <div className={styles.list} ref={sportsList}>
        {
          sportsYear.map((sport, i) => (
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

export default YearSports
