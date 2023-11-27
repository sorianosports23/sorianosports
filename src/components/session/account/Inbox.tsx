import { useCallback, useContext, useEffect, useState } from "react"
import styles from "../../../css/session/account/Inbox.module.css"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiGetAllMessages from "../../../api/page/contact/getAllMessages"
import apiGetContactID from "../../../api/page/contact/getContactFromID"
import SendModal from "../../modal/SendModal"
import ImboxMessage from "../../modal/ImboxMessage"

const statusLabel = {
  1: "Pendiente",
  2: "Resuelto"
}

const Inbox = () => {

  const { token } = useContext(userSessionContext)
  const [messages, setMessages] = useState<TContact[]>([])  

  const handleGetUserMessages = useCallback(async () => {
    if (token) {
      const res = await apiGetAllMessages(token)
      if (res.data) {
        setMessages(res.data)
      }
    }
  }, [token])

  useEffect(() => {
    handleGetUserMessages()
  }, [handleGetUserMessages])

  //!MODAL

  const [sendModal, setSendModal] = useState(false)
  const [sendModalMsg, setSendModalMsg] = useState("")
  const [sendModalOtMsg, setSendModalOtMsg] = useState("")

  const handleShowModal = (msg: string, otMsg: string = "") => {
    setSendModalMsg(msg)
    setSendModalOtMsg(otMsg)
    setSendModal(true)
  }

  //!MODAL SHOW MESSAGE
  const [showMsg, setShowMsg] = useState(false)
  const [showMsgMessage, setShowMsgMessage] = useState("")

  const handleGetMessage = async (id: number) => {
    const res = await apiGetContactID({ id, token })

    if (res.status) {
      if (res.data) {
        setShowMsgMessage(res.data)
        setShowMsg(true)
      } else {
        handleShowModal("No se pudo ver el mensaje")
      }
    } else {
      handleShowModal("No se pudo ver el mensaje", res.message)
    }
  }

  return (
    <>
    <div className={styles.inbox_table}>
      <ul>
        {
          messages.map((message, i) => (
            <li>
              <div className={styles.card}>
                <div>
                  <p>Asunto</p>
                  <span style={{fontFamily: "Raleway"}}>{message.subject}</span>
                </div>

                <div>
                  <p>Estado</p>
                  <span className={styles.status_span} style={{fontFamily: "Raleway"}}>
                    <div className={styles.color_status} data-color={message.status}/>
                    {statusLabel[message.status]}
                  </span>
                </div>
                <button 
                  className={styles.btn_show} 
                  style={{opacity: Number(message.status) === 2 ? 1:0}}
                  onClick={() => {
                    if (Number(message.status) === 1) return
                    handleGetMessage(message.id)
                  }}
                >
                  Ver Mensaje
                </button>
              </div>
            </li>
          ))
        }

       
      </ul>
    </div>

    <SendModal
      open={sendModal}
      close={() => setSendModal(false)}
      message={sendModalMsg}
      otherMessage={sendModalOtMsg}
    />

    <ImboxMessage
      open={showMsg}
      close={() => setShowMsg(false)}
      message={showMsgMessage}
    />
    </>
  )
}

export default Inbox;