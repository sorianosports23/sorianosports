import Admin from "./Admin"
import { useState, useEffect, useContext } from "react"
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
import { userSessionContext } from "../../context/session/UserSessionContext"
import apiAdminModifyEvent from "../../api/admin/events/editEvent"
import EditEvent from "../../components/admin/modal/EditEvent"
import apiGetEvent from "../../api/page/events/getEvent"

const Events = () => {

  const {token} = useContext(userSessionContext)

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
      setTotalPages(req.pagination.totalPages)
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

  //!EDIT 
  const [editOpen, setEditOpen] = useState(false)
  const [editEvent, setEditEvent] = useState<IEventID>({id: 0, date_ev: "", description: "", name: "", place: "", sport: "", time: "", city: "", extrainfo: "", inscriptioninfo: "", rules: "", urlubi: "", check_great: 0})
  const [submitting, setSubmitting] = useState(false)
  //!

  const handleShowSendModal = (msg: string, otMsg: string = "") => {
    setModalSendMsg(msg)
    setModalSendOMsg(otMsg)
    setModalSendOpen(true)
  }

  //!EDIT EVENT
  const handleEditEvent = async (info: TEvent) => {
    const res = await apiGetEvent(info.id)
    if (res.data) {
      setEditEvent(res.data)
      setEditOpen(true)
    } else {
      handleShowSendModal("No se pudo editar el evento", "No se pudo cargar la información desde la API")
    }
  }

  const handleSubmitEditEvent = async (data: Omit<IApiAdminModifyEventRequest, "token">) => {
    const dataEdit = {
      token,
      ...data
    }

    setSubmitting(true)
    const res = await apiAdminModifyEvent(dataEdit)
    setSubmitting(false)

    if (res.status) {
      setModalSendMsg("Se edito correctamente")
      setModalSendOMsg("")
    } else {
      setModalSendMsg("No se pudo editar")
      setModalSendOMsg(res.message)
    }

    setModalSendOpen(true)

  }
  //!

  const handleOpenModalDelete = (id: number) => {
    setModalDeleteID(id)
    setModalDeleteName(`${id}`)
    setModalDeleteOpen(true)
  }


  const handleDeleteEvent = async () => {
    const res = await apiDeleteEvent({ token, id: modalDeleteID })
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
    if (actualPage - 1 === 0) return
    handleGetEvents(actualPage - 1)
    setActualPage(prev => prev-1)
  }

  const handleNextPage = () => {
    if (actualPage + 1 === totalPages + 1) return
    handleGetEvents(actualPage + 1)
    setActualPage(prev => prev+1)
  }

  const handleChangePage = (pag: number) => {
    if (pag <= 0 || pag > totalPages) return
    setActualPage(pag)
    handleGetEvents(pag)
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
              handleEditButton={() => handleEditEvent(event)}
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

      <EditEvent
        open={editOpen}
        close={() => setEditOpen(false)}
        info={editEvent}
        submitting={submitting}
        handleSubmit={handleSubmitEditEvent}
      />
    </Admin>
  )
}

export default Events
