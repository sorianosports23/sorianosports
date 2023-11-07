import { Link } from "react-router-dom"
import styles from "../../css/modal/SendModal.module.css"

type TSendModalProps = {
  open: boolean
  close: () => void
  message: string
  otherMessage?: string
  otherMsgLink?: string
}

const SendModal = ({ open, close, message, otherMessage, otherMsgLink }: TSendModalProps) => {
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
          <button onClick={() => close()}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}

export default SendModal
