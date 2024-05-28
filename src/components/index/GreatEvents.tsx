import { Link } from "react-router-dom"
import styles from "../../css/index/GreatEvents.module.css"
import UseTime from "./UseTime"
import assetsFolder from "../../utils/publicfolder"
import { useEffect, useState } from "react"
import apiGetGreatEvent from "../../api/page/events/getGreatEvent"
import api from "../../api/apiRoute"

const GreatEvents = () => {

  const [loading, setLoading] = useState(true)
  const [isValid, setIsValid] = useState(true)
  const [data, setData] = useState<TEvent>({check_great: 0, date_ev: "", description: "", id: 0, name: "", place: "", sport: "", time: ""})

  const handleCheckIfValidDate = (date: string) => {
    const actualDate = new Date().getTime()
    const dateEvent = new Date(date).getTime()
    if ((dateEvent - actualDate) < 0) {
      setIsValid(false)
      return false
    }
    return true
  }

  useEffect(() => {
    (async () => {
      const res = await apiGetGreatEvent()
      if (res.data) {
        const eventData = res.data
        const nextEvent = eventData[0]
        if (!handleCheckIfValidDate(nextEvent.date_ev)) return
        setData(nextEvent)
      }
      setLoading(false)
    })()
  }, [])

  if (loading || !isValid) return <></>

  return (
    <div className={styles.cont}>
      <div className={styles.title}>
        <h2>Próximo Gran Evento</h2>
      </div>

      <div className={styles.event}>
        <div className={styles.time_cont}>
          <UseTime date={data.date_ev}/>
        </div>

        <div className={styles.general_cont}>
          <div className={styles.info}>
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            <Link to={`/evento/${data.id}`}>Ver más</Link>
          </div>

          <div className={styles.image}>
            <img src={`${api}/events/getImage.php?id=${data.id}`} alt="img" />
          </div>
        </div>


      </div>

      <div className={styles.bg}>
        {/* <div className={styles.triangle} style={{backgroundImage: `url(${assetsFolder}/img/greatevent_polygon.svg)`}}/> */}
        {/* <img src="http://localhost/api/events/getImage.php?id=2" alt="ge-img" /> */}
      </div>
    </div>
  )  
} 

export default GreatEvents;
