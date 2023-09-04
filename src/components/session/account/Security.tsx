import styles from "../../../css/session/account/Security.module.css"

const Security = () => {
  return (
    <div>
      <div className={styles.change_password}>
        <h2>Cambiar contraseña</h2>
        <form>
          <div className={styles.block}>
            <label htmlFor="#">Contraseña actual</label>
            <input type="password"/>
          </div>

          <div>
            <label htmlFor="#">Contraseña nueva</label>
            <input type="password"/>
          </div>
          <div>
            <label htmlFor="#">Verificar contraseña nueva</label>
            <input type="password"/>
          </div>

          <div className={styles.block}>
            <button>Cambiar contraseña</button>
          </div>
        </form>
      </div>

      <div className={styles.delete_account}>
        <button>Borrar cuenta</button>
      </div>
    </div>
  )
}

export default Security
