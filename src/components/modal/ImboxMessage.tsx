import { BsXLg } from "react-icons/bs"
import modalStyles from "../../css/Modal.module.css"
import useCloseModalKey from "../../utils/useCloseModalKey"

type TImboxMsgProps = {
  open: boolean
  close: () => void
  message: string
}

const ImboxMessage = ({ open, close, message }: TImboxMsgProps) => { 
  return (
    <div 
      className={modalStyles.cont}
      data-open={open}
      {...useCloseModalKey({ open, close })}
    >
      <div 
        className={modalStyles.modal}
      >
        <div className={modalStyles.header}>
          <h2>Ver mensaje</h2>
          <button
            onClick={close}
          >
            <BsXLg/>
          </button>
        </div>

        <div>
          <p>{message}</p>
        </div>

        <div className={`${modalStyles.footer} ${modalStyles.btns}`}>
          <button 
            onClick={close}
            className={modalStyles.btn_cancel}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImboxMessage
