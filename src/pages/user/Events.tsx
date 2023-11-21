import { useCallback, useEffect, useState } from "react"
import EventCard from "../../components/events/EventCard"
import styles from "../../css/events/Events.module.css"
import { BsFillCaretDownFill, BsFillCalendarDateFill , BsFillCaretUpFill, BsCalendarCheckFill} from "react-icons/bs"
import User from "./User"
import Loading from "../Loading"
import { useNavigate } from "react-router-dom"
import apiGetEvents from "../../api/page/events/getEvents"
import Container from "../../components/templates/Container"
import NewEventCard from "../../components/events/NewEventCard"

const Events = () => {


  //!
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(undefined)

  useEffect(() => {
    (async () => {
      await getEvents(1, true)
      setLoading(false)
    })()
  }, [])

  //!

  const [responseData, setResponseData] = useState({
    totalPages: 0,
    currentPage: 0
  })

  const getEvents = async (pos: number = 1, firstLoad: boolean = false) => {
    const eventRes = await apiGetEvents(pos)
    console.log(eventRes)
    if (eventRes.status) {
      setEvents(prev => [...prev, ...eventRes.data])
      setResponseData(eventRes.pagination)

      if (firstLoad) setEventsToShow(eventRes.data)
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
  const [eventsCity, setEventsCity] = useState("Todos")
  const [sportSelected, setSportSelected] = useState("Todos")
  const [sportsName, setSportsName] = useState<Array<string>>([])
  const [eventsToShow, setEventsToShow] = useState<Array<TEvent>>([])
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null)
  const [cityNames, setCityNames] = useState<Array<string>>(["Todos"])
  const [sportNames, setSportNames] = useState<Array<string>>(["Todos"])

  const handleChangeEventsCity = (city: string) => {
    setEventsCity(city)
    setShowPlaces(false)
  }

  const handleChangeSportSelected = (sport: string) => {
    setSportSelected(sport)
    setShowSports(false)
  }

  const handleSetEventsInfo = useCallback(() => {
    for (let i in events) {
      setCityNames(prev => {
        if (prev.includes(events[i].place)) return prev
        return [...prev, events[i].place]
      })
      setSportNames(prev => {
        if (prev.includes(events[i].sport)) return prev
        return [...prev, events[i].sport]
      })
    }
  }, [events])

  const handleSetEventsToShow = useCallback(() => {
    const eventsFilters: TEvent[] = [] 
    events.map((event) => {
      let eventIsOnCity = true
      let eventIsSport = true

      if (event.place !== eventsCity && eventsCity !== "Todos") {
        eventIsOnCity = false
      }
      if (event.sport !== sportSelected && sportSelected !== "Todos") {
        eventIsSport = false
      }

      if (eventIsOnCity && eventIsSport) {
        eventsFilters.push(event)
      }
      return null
    })
    setEventsToShow(eventsFilters)
  }, [events, eventsCity, sportSelected])

  useEffect(() => {
    handleSetEventsInfo()
    handleSetEventsToShow()
  }, [events, handleSetEventsInfo, handleSetEventsToShow])

  if (loading) return <Loading/>

  return (
    <User pageTitle="Eventos">
      <Container>
        <div className={styles.programation}>
          <div className={styles.title}>
            <h1>Programación</h1>

            <div className={styles.btn_cont}>
              <div>
                <button
                  onClick={() => {
                    setShowPlaces(!showPlaces)
                    if (showSports) setShowSports(false)
                  }}
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
                    display: showPlaces ? "block" : "none",
                    zIndex: showPlaces ? 666 : 0
                  }}
                >
                  {
                    cityNames.map((city, i) => {
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
                  onClick={() => {
                    setShowSports(!showSports)
                    if (showPlaces) setShowPlaces(false)
                  }}
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
                    display: showSports ? "block" : "none",
                    zIndex: showSports ? 666 : 0
                  }}
                >
                  {
                    sportNames.map((sport, i) => {
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

              {/* <button>Fecha <BsFillCalendarDateFill/></button> */}
            </div>
          </div>

          <div className={styles.events}>
            {
              eventsToShow.map((event, i) => (
                <NewEventCard {...event} key={i} />
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
