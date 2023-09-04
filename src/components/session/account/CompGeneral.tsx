import { useContext } from "react"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import styles from "../../../css/session/account/CompGeneral.module.css"

const CompGeneral = () => {
  
  const { username } = useContext(userSessionContext)
  
  return (
    <div>
      <div className={styles.title}>
        {username}
      </div>

      <div className={styles.user_info}>
        <div className={styles.input_block}>
          <label htmlFor="#">Nombre</label>
          <input type="text" />
        </div>

        <div className={styles.input_block}>
          <label htmlFor="#">Correo</label>
          <input type="email" />
        </div>

        <div>
          <label htmlFor="#">Cedula</label>
          <input type="number" maxLength={8}/>
        </div>

        <div>
          <label htmlFor="#">Telefono</label>
          <input type="number" maxLength={9}/>
        </div>


        <div className={styles.input_block}>
          <button>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompGeneral
