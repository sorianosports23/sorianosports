import { useEffect, useState } from "react"
import CompEvent from "../../components/events/CompEvent"
import CompHeader from "../../components/templates/CompHeader"
import styles from "../../css/events/PageEvents.module.css"
import { BsFillCaretDownFill, BsFillCalendarDateFill , BsFillCaretUpFill} from "react-icons/bs"
import listEvents from "../../utils/events/events.json"
import CompFooter from "../../components/templates/CompFooter"
import PageUser from "./PageUser"

const CompSelectedEvent = (event: TEvent) => {
  return (
    <div>
      <div className={styles.text}>
        <h2>Informacion:</h2>
        <ul>
          <li className={styles.info_li}>
            <div>Nombre:</div>
            <div>{event.name}</div>
          </li>
          <li className={styles.info_li}>
            <div>Descripcion:</div>
            <div>{event.description}</div>
          </li>
          <li className={styles.info_li}>
            <div>Lugar:</div>
            <div>{event.place}</div>
          </li>
          <li className={styles.info_li}>
            <div>Horario:</div>
            <div>{event.hour}</div>
          </li>
          <li className={styles.info_li}>
            <div>Fecha:</div>
            <div>{event.day} {event.dayNumber}</div>
          </li>
        </ul>
      </div>
      <div className={styles.photos}>
        <img src={process.env.PUBLIC_URL + "assets/img/img_placeholder.png"} alt="img-placeholder" />
      </div>          
  </div>    
  )
}

const PageEvents = () => {

  const [showPlaces, setShowPlaces] = useState(false)
  const [showSports, setShowSports] = useState(false)
  const [events] = useState<IEvents>(listEvents as IEvents)
  const [eventsCity, setEventsCity] = useState("Mercedes")
  const [sportSelected, setSportSelected] = useState("Todos")
  const [sportsName, setSportsName] = useState<Array<string>>([])
  const [eventsToShow, setEventsToShow] = useState<Array<TEvent>>([])
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null)

  const handleChangeEventsCity = (city: string) => {
    setEventsCity(city)
    setShowPlaces(false)
  }

  const handleChangeSportSelected = (sport: string) => {
    setSportSelected(sport)
    setShowSports(false)
  }

  useEffect(() => {
    setSportsName(["Todos"])
    setSportSelected("Todos")
  }, [eventsCity])

  useEffect(() => {
    events[eventsCity].map(city => {
      setSportsName(prev => {
        if (prev.includes(city.sportName)) return prev
        return [...prev, city.sportName]
      })

      return null
    })
    console.log(sportsName)
  }, [events, sportsName, sportSelected, eventsCity])

  useEffect(() => {
    if (sportSelected === "Todos") {
      setEventsToShow(events[eventsCity])
    } else {
      setEventsToShow(
        events[eventsCity].filter(ev => ev.sportName === sportSelected)
      )
    }
  }, [events, sportSelected, eventsCity])

  return (
    <PageUser>
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
                  Object.keys(events).map((city, i) => {
                    if (city !== eventsCity) {
                      return  <li key={i}>
                                <button onClick={() => handleChangeEventsCity(city)}>{city}</button>
                              </li>
                    } else return null
                  })
                }
              </ul>
            </div>

            <div>
              <button
                onClick={() => setShowSports(!showSports)}
              >
                Deportes
                {
                  showSports
                    ? <BsFillCaretDownFill/>
                    : <BsFillCaretUpFill/>
                }
              </button>
              <p
                style={{
                  borderRadius: showSports
                    ? "0" 
                    : "0 0 1rem 1rem"
                }}
              >{sportSelected}</p>

              <ul className={styles.btn_cont_list}
                style={{
                  display: showSports ? "block" : "none"
                }}
              >
                {
                  sportsName.map((sport, i) => {
                    if (sport === sportSelected) return null
                    return <li key={i}>
                            <button onClick={() => handleChangeSportSelected(sport)}>
                              {sport}
                            </button>
                           </li>
                  })
                }
              </ul>
            </div>

            

            <button>Fecha <BsFillCalendarDateFill/></button>
          </div>
        </div>

        <div className={styles.events}>
          {
            eventsToShow.map((event) => {
              const props = {
                ...event,
                handleSelectEvent: setSelectedEvent
              }

              return <CompEvent {...props}/>
            })
          }
        </div>
        
      </div>

      <div className={styles.divider}></div>

      <div className={styles.info}>
        {
          selectedEvent 
            ? <CompSelectedEvent {...selectedEvent as TEvent}/>
            : <div>Nada seleccionado</div>
        }
      </div>
    </PageUser>
  )
}

export default PageEvents
