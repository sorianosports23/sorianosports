import { BsXLg } from "react-icons/bs"
import modalStyle from "../../css/Modal.module.css"
import useCloseModalKey from "../../utils/useCloseModalKey"

type TOptionModalProps = {
  open: boolean
  option: string
  optionName: string
  acceptFunction: () => void
  close: () => void
}

const OptionModal = ({ open, option, optionName, acceptFunction, close }: TOptionModalProps) => {
  return (
    <div 
      className={modalStyle.cont} 
      data-open={open}
      {...useCloseModalKey({ open, close })}
    >
      <div className={modalStyle.modal}>
        <div className={modalStyle.header}>
          <h2>{option} - {optionName}</h2>
          <button
            onClick={close}
          >
            <BsXLg/>
          </button>
        </div>

        <div className={`${modalStyle.footer} ${modalStyle.btns}`}>
          <button 
            className={modalStyle.btn_cancel}
            onClick={close}
          >
            Cancelar
          </button>
          <button
            className={modalStyle.btn_accept}
            onClick={acceptFunction}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}

export default OptionModal
