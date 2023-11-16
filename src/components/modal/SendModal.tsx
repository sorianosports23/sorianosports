import { Link, useNavigate } from "react-router-dom"
import styles from "../../css/modal/SendModal.module.css"

type TSendModalProps = {
  open: boolean
  close: () => void
  message: string
  otherMessage?: string
  otherMsgLink?: string
  redirect?: string
}

const SendModal = ({ open, close, message, otherMessage, otherMsgLink, redirect }: TSendModalProps) => {

  const navigate = useNavigate()

  return (
    <div 
      data-open={open}
      className={styles.cont}
      style={{
        zIndex: 66666
      }}
    >
      <div className={styles.modal}>
        <div className={styles.msg}>
          <div>
            {message}
          </div>
          {
            otherMessage && <div>
              {
                otherMsgLink
                  ? <Link to={otherMsgLink}>{otherMessage}</Link>
                  : otherMessage
              }    
            </div>
          }
        </div>
        <div className={styles.btn}>
          {
            redirect 
              ? <button onClick={() => navigate("/auth/perfil?location=inscripciones")}>Cerrar</button>
              : <button onClick={close}>Cerrar</button>
          }
        </div>
      </div>
    </div>
  )
}

export default SendModal
