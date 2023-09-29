import { FormEvent, useContext, useState } from "react"
import styles from "../../../css/session/account/Security.module.css"
import apiChangePassword from "../../../api/session/changePassword"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import { useNavigate } from "react-router-dom"
import Toast from "../../toast/Toast"

const Security = () => {

  const navigate = useNavigate()

  const { username, logout, token } = useContext(userSessionContext)

  const [actualPassword, setActualPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [verifyNewPassword, setVerifyNewPassword] = useState("")
  const [newPasswordError, setNewPasswordError] = useState(false)
  const [actualPasswordError, setActualPasswordError] = useState(false)

  //

  const [toastMessage] = useState("Contraseña cambiada")
  const [toastSecondMessage] = useState("Redirigiendo...")
  const [toastOpen, setToastOpen] = useState(false)

  //

  const handleVerifyNewPassword = (): boolean => {
    return newPassword === verifyNewPassword
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()

    const newPasswordVerified = handleVerifyNewPassword()

    if (!newPasswordVerified) {
      setNewPasswordError(true)
      return
    }
    
    const changedPassword = await apiChangePassword({ username, password: actualPassword, newPassword, token })

    if (!changedPassword.status) {
      if (changedPassword.err === "actualpassword") {
        setActualPasswordError(true)
        return
      }

      return
    }

    setToastOpen(true)
    logout()

    setTimeout(() => {
      navigate("/auth/login")
    }, 5000);
  }

  return (
    <div>
      <div className={styles.change_password}>
        <h2>Cambiar contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.block}>
            <label htmlFor="#">Contraseña actual</label>
            <input type="password"
              value={actualPassword}
              onChange={(ev) => {
                setActualPassword(ev.target.value)
                if (actualPasswordError) setActualPasswordError(false)
              }}
              data-error={actualPasswordError}
            />
            <span>
              {
                actualPasswordError && "Contraseña incorrecta"
              }
            </span>
          </div>

          <div>
            <label htmlFor="#">Contraseña nueva</label>
            <input type="password"
              value={newPassword}
              onChange={(ev) => setNewPassword(ev.target.value)}
            />
          </div>
          <div>
            <label htmlFor="#">Verificar contraseña nueva</label>
            <input type="password"
              value={verifyNewPassword}
              onChange={(ev) => {
                setVerifyNewPassword(ev.target.value)
                if (newPasswordError) setNewPasswordError(false)
              }}
              data-error={newPasswordError}
            />
            <span>
              {
                newPasswordError && "Verifica la contraseña"
              }
            </span>
          </div>

          <div className={styles.block}>
            <button>Cambiar contraseña</button>
          </div>
        </form>
      </div>

      <div className={styles.delete_account}>
        <button>Borrar cuenta</button>
      </div>

      <Toast
        message={toastMessage}
        secondMessage={toastSecondMessage}
        closeIn={5}
        icon="ok"
        open={toastOpen}
      />
    </div>
  )
}

export default Security
