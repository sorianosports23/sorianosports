import Admin from "../Admin"
import pageStyles from "../../../css/admin/page/Page.module.css"
import tableStyles from "../../../css/admin/table.module.css"
import eventStyles from "../../../css/admin/events/EventCard.module.css"
import { Link } from "react-router-dom"
import { BsPenFill, BsPlusLg, BsThreeDots, BsTrashFill } from "react-icons/bs"
import { useCallback, useContext, useEffect, useState } from "react"
import apiGetFaq from "../../../api/admin/faq/getFaq"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiAdminDeleteFaq from "../../../api/admin/faq/deleteFaq"
import OptionModal from "../../../components/modal/OptionModal"
import SendModal from "../../../components/modal/SendModal"
import EditFaq from "../../../components/admin/modal/EditFaq"
import apiAdminModifyFaq from "../../../api/admin/faq/modifyFaq"

const Faq = () => {

  const {token} = useContext(userSessionContext)

  const [dropdown, setDropdown] = useState(false)
  const [faqData, setFaqData] = useState<TFaq[]>([])

  const handleGetFaq = useCallback(async () => {
    const res = await apiGetFaq()

    if (res.data) {
      setFaqData(res.data)
    }
  }, [])

  useEffect(() => {
    handleGetFaq()
  }, [handleGetFaq])

  //!SENDMODAL
  const [sendModal, setSendModal] = useState(false)
  const [sendModalMsg, setSendModalMsg] = useState("")
  const [sendModalOtMsg, setSendModalOtMsg] = useState("")

  const handleOpenModal = (msg: string, otMsg: string = "") => {
    setSendModalMsg(msg)
    setSendModalOtMsg(otMsg)
    setSendModal(true)
  }
  //!

  //!OPT MODAL
  const [optModal, setOptModal] = useState(false)
  const [optName, setOptName] = useState(0)

  const handleOpenOptionDelete = (id: number) => {
    setOptName(id)
    setOptModal(true)
  }

  const handleDeleteFaq = async () => {
    const res = await apiAdminDeleteFaq({token, id: optName})

    if (res.status) {
      setOptModal(false)
      handleOpenModal("Se elimino la pregunta")
      handleGetFaq()
    } else {
      handleOpenModal("No se pudo eliminar la pregunta", res.message)
    }
  }
  //!

  //!EDIT MODAL
  
  const [editModal, setEditModal] = useState(false)
  const [editInfo, setEditInfo] = useState<TFaq>({id: 0, name: "", response: ""})

  const handleOpenEdit = (info: TFaq) => {
    setEditInfo(info)
    setEditModal(true)
  }

  const handleEditEvent = async ({id,name,response}: TFaq) => {
    const data: TApiAdminModifyFaqParams = {
      token,
      id,
      name,
      response
    }

    const res = await apiAdminModifyFaq(data)

    if (res.status) {
      handleOpenModal("Se edito correctamente")
      setEditModal(false)
      handleGetFaq()
    } else {
      handleOpenModal("No se pudo editar", res.message)
    }
  }

  //!

  return (
    <Admin route_title="Editar preguntas frecuentes">
      <div className={pageStyles.management}>
        <Link to="/admin/add/faq" className={pageStyles.btn_add}><BsPlusLg/> Agregar pregunta frecuente</Link>
      </div>

      <div className={tableStyles.table} style={{marginTop: "1rem"}}>

        {
          faqData.map((faq, i) => (
            <div className={tableStyles.entry}
              onPointerLeave={() => setDropdown(false)}
            >
              <div className={tableStyles.id}>
                <span>{faq.id}</span>
              </div>

              <div className={tableStyles.a}>
                <p>{faq.name}</p>
                <p>{faq.response}</p>
              </div>

              <div>
                <div className={eventStyles.dropdown}>
                  <button
                    onClick={() => setDropdown(prev => !prev)}
                  >
                    <BsThreeDots/>
                  </button>

                  <ul style={{display: dropdown ? "flex" : "none"}}>
                    <li>
                      <button
                        onClick={() => handleOpenEdit(faq)}
                      >
                        <BsPenFill/>
                        Editar
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={() => handleOpenOptionDelete(faq.id)}
                      >
                        <BsTrashFill/>
                        Borrar
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          ))
        }

      </div>

      <SendModal
        open={sendModal}
        close={() => setSendModal(false)}
        message={sendModalMsg}
        otherMessage={sendModalOtMsg}
      />

      <OptionModal
        open={optModal}
        close={() => setOptModal(false)}
        option="Eliminar"
        optionName={`${optName}`}
        acceptFunction={handleDeleteFaq}
      />

      <EditFaq
        open={editModal}
        close={() => setEditModal(false)}
        info={editInfo}
        handleSubmit={handleEditEvent}
      />
    </Admin>
  )
}

export default Faq
