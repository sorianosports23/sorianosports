import User from "./User"
import { useLoaderData } from "react-router-dom"
import Container from "../../components/templates/Container"
import styles from "../../css/events/EventID.module.css"
import api from "../../api/apiRoute"

const EventId = () => {

  const data = useLoaderData() as IEventID

  const date = data.date_ev.split('-')

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
          <div className={styles.img}>
            <img 
              src={`${api}/events/getImage.php?id=${data.id}`} 
              alt={`${data.name} img`} 
            />
          </div>
          <div className={styles.desc}>
            <p>
              {data.description}
            </p>
          </div>

          <div className={styles.info}>
            <div className={styles.attributes}>
              <ul>
                <li><span style={{fontWeight:'bold'}}>Ciudad:</span> <span>{data.city}</span></li>
                <li><span style={{fontWeight:'bold'}}>Lugar:</span> <span>{data.place}</span></li>
                <li><span style={{fontWeight:'bold'}}>Deporte:</span> <span>{data.sport}</span></li>
                <li><span style={{fontWeight:'bold'}}>Horario:</span> <span>{data.time}</span></li>
                <li><span style={{fontWeight:'bold'}}>Fecha:</span> <span>{date[2]}/{date[1]}/{date[0]}</span></li>
              </ul>
            </div>

            {
              data.urlubi
              && (
                <div className={styles.map}>
                  <div dangerouslySetInnerHTML={{__html: data.urlubi}}></div>
                </div>
              )
            }
          </div>

          {
            data.rules
            && (
              <div className={styles.big_info}>
                <h2>Reglas</h2>
                <p>
                  {data.rules}
                </p>
              </div>
            )
          }

          {
            data.inscriptioninfo
            && (
              <div className={styles.big_info}>
                <h2>Información sobre inscripción</h2>
                <p>
                  {data.inscriptioninfo}
                </p>
              </div>
            )
          }

          {
            data.extrainfo
            &&
            <div className={styles.big_info}>
              <h2>Información extra</h2>
              <p>
                {data.extrainfo}
              </p>
            </div>
          }
        </div>
      </Container>
    </User>
  )
}

export default EventId
