import User from "./User"
import { useLoaderData } from "react-router-dom"
import { MutableRefObject, useEffect, useRef } from "react"
import Container from "../../components/templates/Container"
import styles from "../../css/events/EventID.module.css"

const EventId = () => {

  const data = useLoaderData() as IEventID

  const iframeMap = useRef<HTMLIFrameElement>(null) as MutableRefObject<HTMLIFrameElement>

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <User>
      <Container>
        <div 
          style={
            {marginTop: "1rem"}
          }
          className={styles.cont}
        >
          <h2>{data.name}</h2>
          <div className={styles.desc}>
            {data.description}
          </div>

          <div className={styles.info}>
            <div className={styles.attributes}>
              <ul>
                <li>Ciudad: <span>{data.city}</span></li>
                <li>Lugar: <span>{data.place}</span></li>
                <li>Deporte: <span>{data.sport}</span></li>
                <li>Horario: <span>{data.time}</span></li>
                <li>Fecha: <span>{data.date_ev}</span></li>
              </ul>
            </div>

            <div className={styles.map}>
              {/* <iframe title="Mapa del evento" srcDoc={data.urlUbi}></iframe> */}
              <div dangerouslySetInnerHTML={{__html: data.urlUbi}}></div>
            </div>
          </div>

          <div className={styles.big_info}>
            <h2>Reglas</h2>
            <p>
              {data.rules}
            </p>
          </div>

          <div className={styles.big_info}>
            <h2>Información sobre inscripción</h2>
            <p>
              {data.inscriptionInfo}
            </p>
          </div>

          <div className={styles.big_info}>
            <h2>Información extra</h2>
            <p>
              {data.extraInfo}
            </p>
          </div>
        </div>
      </Container>
    </User>
  )
}

export default EventId
