import styles from "../../css/modal/SendModal.module.css"

type TSendModalProps = {
  open: boolean
  close: () => void
  message: string
  otherMessage?: string
}

const SendModal = ({ open, close, message, otherMessage }: TSendModalProps) => {
  return (
    <div 
      data-open={open}
      className={styles.cont}
    >
      <div className={styles.modal}>
        <div className={styles.msg}>
          <div>
            {message}
          </div>
          {
            otherMessage && <div className={styles.sMsg}>{otherMessage}</div>
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
