import { useEffect, useState } from "react"
import EventCard from "../../components/events/EventCard"
import styles from "../../css/events/Events.module.css"
import { BsFillCaretDownFill, BsFillCalendarDateFill , BsFillCaretUpFill, BsCalendarCheckFill} from "react-icons/bs"
import listEvents from "../../utils/events/events.json"
import User from "./User"
import Loading from "../Loading"
import assetsFolder from "../../utils/publicfolder"
import { useNavigate } from "react-router-dom"
import apiGetEvents from "../../api/page/events/getEvents"
import Container from "../../components/templates/Container"
import classNames from "classnames"

const Events = () => {

  const navigate = useNavigate()

  //!
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(undefined)

  useEffect(() => {
    (async () => {
      await getEvents()
      setLoading(false)
    })()
  }, [])

  //!

  const [responseData, setResponseData] = useState({
    totalPages: 0,
    currentPage: 0
  })

  const getEvents = async (pos: number = 1) => {
    const eventRes = await apiGetEvents(pos)
    console.log(eventRes)
    if (eventRes.status) {
      setEvents(prev => [...prev, ...eventRes.data])
      setResponseData(eventRes.pagination)
    }
  }

  useEffect(() => {
    if (data) {
      setLoading(false)
      console.log(data)
    }
  }, [data])

  const [showPlaces, setShowPlaces] = useState(false)
  const [showSports, setShowSports] = useState(false)
  const [events, setEvents] = useState<Array<TEvent>>([])
  const [eventsCity, setEventsCity] = useState("Mercedes")
  const [sportSelected, setSportSelected] = useState("Todos")
  const [sportsName, setSportsName] = useState<Array<string>>([])
  const [eventsToShow, setEventsToShow] = useState<Array<TEvent>>([])
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null)

  const handleChangeEventsCity = (city: string) => {

  }

  const handleChangeSportSelected = (sport: string) => {

  }

  if (loading) return <Loading/>

  return (
    <User>
      <Container>
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
              events.map((event, i) => (
                <EventCard {...event} key={i} />
              ))
            }
          </div>

          <div className={styles.res_info}>
            {
              responseData.currentPage === responseData.totalPages
                ? 
                <div className={styles.no_more}>
                  <BsCalendarCheckFill/>
                  No hay mas eventos que cargar
                </div>
                : 
                <button 
                  className={styles.load_more} 
                  onClick={() => getEvents(responseData.currentPage+1)}
                >
                  CARGAR MAS
                </button>
            }
          </div>
          
        </div>
      </Container>
    </User>
  )
}

export default Events
