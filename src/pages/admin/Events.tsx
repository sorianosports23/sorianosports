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
import PageStyles from "../../css/admin/page/Page.module.css"
import TableStyles from "../../css/admin/table.module.css"
import Pagination from "../../components/admin/templates/Pagination"

const Events = () => {

  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState<TEvent[]>([])

  useEffect(() => {
    handleGetEvents()
  }, [])

  //! PAGINATION
  const [actualPage, setActualPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  //!

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
  
  //! pagination
  const handlePrevPage = () => {

  }

  const handleNextPage = () => {

  }

  const handleChangePage = (pag: number) => {

  }
  //!

  return (
    <Admin route_title="Eventos">
      <div className={styles.management}>
        <Link to="/admin/add/event" className={styles.btn_add}><BsPlusLg/> Añadir evento</Link>
      </div>
      
      <div className={PageStyles.tableList} style={{marginTop: "1rem"}}>
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
      </div>

      <div className={TableStyles.pagination}>
        <Pagination
          actualPage={actualPage}
          totalPages={totalPages}
          prevBtn={handlePrevPage}
          nextBtn={handleNextPage}
          changePage={handleChangePage}
        />
      </div>

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
