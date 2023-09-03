import { Link } from "react-router-dom"
import styles from "../../css/modal/CompModal.module.css"
import { BsXLg } from "react-icons/bs"
import assetsFolder from "../../utils/publicfolder"

type TModalProps = {
  open: boolean
  close: () => void
  title: string
  body: string
  error: boolean
}

const CompModal = ({ open, close, title, body, error }: TModalProps) => {
  return (
    <div className={styles.modal} data-open={open}>
      <div className={styles.modalComp}>
        <div className={styles.modal_header}>
          <h1>
            <img src={assetsFolder + "/../logo.png"} alt="logo" />
            {title}
          </h1>
          <button
            onClick={() => close()}
          >
            <BsXLg/>
          </button>
        </div>

        <div className={styles.modal_body}>
          {body}.
          {
            error && (
              <p style={{marginTop: ".5rem"}}>
                Vuelve a intentar nuevamente, si el error continua, usa el formulario de ayuda aqui: <Link to="/faq">Ayuda</Link>
              </p>
            )
          }
        </div>

        <div className={styles.modal_footer}>
          <button onClick={() => close()}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompModal