import User from "../User"
import styles from "../../../css/activities/sports/Sports.module.css"
import Container from "../../../components/templates/Container"
import SportCard from "../../../components/activities/sports/SportCard"
import { useEffect, useState } from "react"
import assetsFolder from "../../../utils/publicfolder"
import SportSearch from "../../../components/activities/sports/SportSearch"
import apiGetSports from "../../../api/page/sports/getSports"
import apiGetCityFromSport from "../../../api/page/sports/getCityFromSport"
import SendModal from "../../../components/modal/SendModal"

const Sports = () => {

  const [sportSelected, setSportSelect] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  const [cityList, setCityList] = useState<string[]>([])
  const [sports, setSports] = useState<string[]>([])

  //! MODAL SEND
  const [modalSend, setModalSend] = useState(false)
  const [modalMsg, setModalMsg] = useState("")
  //!

  useEffect(() => {
    (async () => {
      const res = await apiGetSports()

      if (res.status) {
        let sportsList: string[] = []

        res.data.forEach(sport => {
          if (!sportsList.includes(sport.name)) sportsList.push(sport.name)
        })

        setSports(sportsList)
      }
    })()
  }, [])

  const handleOpenModalCity = async (sport: string) => {
    const res = await apiGetCityFromSport(sport)

    if (res.status) {
      if (res.data) {
        setCityList(res.data)
        setModalOpen(true)
      } else {
        setModalMsg("El deporte no esta registrado en ninguna ciudad")
        setModalSend(true)
      }
    } else {
      setModalMsg("Ocurrio un error cargando las ciudades")
      setModalSend(true)
    }
  }

  return (
    <User pageTitle="Deportes">
      <Container>
        <div className={styles.selector}>
          <div className={styles.separator}>
            <img src={assetsFolder + "/img/secretaria_deportes.svg"} alt="deportes" />
          </div>
        </div>

        <div className={styles.sports}>
          {
            sports.map((sport, i) => (
              <SportCard
                name={sport}
                iconUrlName={sport}
                backgroundUrlName={sport}
                key={i}
                select={() => {
                  setSportSelect(sport)
                  handleOpenModalCity(sport)
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
        cityList={cityList}
      />

      <SendModal
        open={modalSend}
        close={() => setModalSend(false)}
        message={modalMsg}
      />
    </User>
  )
}

export default Sports
