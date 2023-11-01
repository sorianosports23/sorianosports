import Admin from "./Admin"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { BsPlusLg } from "react-icons/bs"
import styles from "../../css/admin/events/Events.module.css"
import apiGetEvents from "../../api/page/events/getEvents"
import Loading from "../Loading"
import EventCard from "../../components/admin/events/EventCard"
import OptionModal from "../../components/modal/OptionModal"
import SendModal from "../../components/modal/SendModal"
import apiDeleteEvent from "../../api/admin/events/deleteEvent"

const Events = () => {

  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState<TEvent[]>([])

  useEffect(() => {
    handleGetEvents()
  }, [])

  const handleGetEvents = async (pag: number = 1) => {
    const req = await apiGetEvents(pag)
    if (req.status) {
      setEvents(req.data)
    }
    setLoading(false)
  }

  //! MODAL SEND

  const [modalSendOpen, setModalSendOpen] = useState(false)
  const [modalSendMsg, setModalSendMsg] = useState("")
  const [modalSendOMsg, setModalSendOMsg] = useState("")

  //! MODAL DELETE

  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [modalDeleteName, setModalDeleteName] = useState("")
  const [modalDeleteID, setModalDeleteID] = useState(0)

  const handleOpenModalDelete = (id: number) => {
    setModalDeleteID(id)
    setModalDeleteName(`${id}`)
    setModalDeleteOpen(true)
  }


  const handleDeleteEvent = async () => {
    const res = await apiDeleteEvent({ token: "", id: modalDeleteID })
    setModalDeleteOpen(false)
    if (res.status) {
      setModalSendMsg("Se elimino correctamente")
      handleGetEvents()
    } else {
      setModalSendMsg("No se pudo eliminar el evento")
    }
    setModalSendOpen(true)
  }

  if (loading) {
    return <Loading/>
  }

  return (
    <Admin route_title="Eventos">
      <div className={styles.management}>
        <Link to="/admin/add/event" className={styles.btn_add}><BsPlusLg/> Añadir evento</Link>
      </div>
      {

        events.map((event, i) => (
          <EventCard
            data={event}
            key={i}
            handleDeleteButton={() => handleOpenModalDelete(event.id)}
            handleEditButton={() => {}}
          />
        ))
      }

      <OptionModal
        open={modalDeleteOpen}
        close={() => setModalDeleteOpen(false)}
        option="Eliminar"
        optionName={`${modalDeleteName} (${modalDeleteID})`}
        acceptFunction={handleDeleteEvent}
      />

      <SendModal
        open={modalSendOpen}
        close={() => setModalSendOpen(false)}
        message={modalSendMsg}
        otherMessage={modalSendOMsg}
      />
    </Admin>
  )
}

export default Events
