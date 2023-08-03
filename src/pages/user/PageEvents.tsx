import { useEffect, useState } from "react"
import CompEvent from "../../components/events/CompEvent"
import CompHeader from "../../components/templates/CompHeader"
import styles from "../../css/events/main.module.css"
import { BsFillCaretDownFill, BsFillCalendarDateFill , BsFillCaretUpFill} from "react-icons/bs"
import listEvents from "../../utils/events/events.json"

const PageEvents = () => {

  const [showPlaces, setShowPlaces] = useState(false)
  const [events] = useState<IEvents>(listEvents as IEvents)
  const [eventsCity, setEventsCity] = useState("Mercedes")

  return (
    <>
    <CompHeader/>

    <main>
      <div className={styles.programation}>
        <div className={styles.title}>
          <h1>Programación</h1>

          <div className={styles.btn_cont}>
            <div>
              <button
                onClick={() => setShowPlaces(!showPlaces)}
              >
                Localidades
                {
                  showPlaces
                    ? <BsFillCaretDownFill/>
                    : <BsFillCaretUpFill/>
                }
              </button>
              <p
                style={{
                  borderRadius: showPlaces
                    ? "0" 
                    : "0 0 1rem 1rem"
                }}
              >{eventsCity}</p>

              <ul className={styles.btn_cont_list}
                style={{
                  display: showPlaces ? "block" : "none"
                }}
              >
                {
                  Object.keys(events).map((city, i) => (
                    <li key={i}>
                      <button onClick={() => setEventsCity(city)}>{city}</button>
                    </li>
                  ))
                }
              </ul>
            </div>

            <button>Fecha <BsFillCalendarDateFill/></button>
          </div>
        </div>

        <div className={styles.events}>
          {
            events[eventsCity].map((event) => (
              <CompEvent
                {
                  ...event
                }
              />
            ))
          }
        </div>
        
      </div>
    </main>
    </>
  )
}

export default PageEvents
