import { FormEvent, useContext, useEffect, useState } from "react"
import styles from "../../../css/session/account/Security.module.css"
import modalStyles from "../../../css/session/account/Modal.module.css"
import apiChangePassword from "../../../api/session/changePassword"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import { useNavigate } from "react-router-dom"
import Toast from "../../toast/Toast"
import apiDeleteAccount from "../../../api/session/deleteAccount"

type TModalProps = {
  open: boolean
  handleClose: () => void
}

const ModalDeleteAccount = ({ open, handleClose }: TModalProps) => {

  const { token, logout } = useContext(userSessionContext)

  const [canSubmit, setCanSubmit] = useState(false)
  const [inputError, setInputError] = useState({
    error: 'false',
    message: ""
  })
  const [inputPassword, setInputPassword] = useState("")

  const toastMessage = "Cuenta borrada"
  const [toastOpen, setToastOpen] = useState(false)

  useEffect(() => {
    if (!inputPassword) setCanSubmit(false)
  }, [inputPassword])

  const handleDeleteBtn = () => {
    if (!inputPassword) return
    setCanSubmit(true)
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!canSubmit) return

    const deletedAccount = await apiDeleteAccount({ token, password: inputPassword })

    if (!deletedAccount.status) {
      setInputError({
        error: 'true',
        message: deletedAccount.message
      })
      return
    }

    setToastOpen(true)
    logout()
    setTimeout(() => {
      window.location.href = `${window.location.origin}/deportes`
    }, 3000);
  } 

  return (
    <>
    <div className={modalStyles.modal} data-open={open}>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="##">Contraseña</label>
            <input type="text"
              value={inputPassword}
              onChange={(e) => {
                setInputPassword(e.target.value)
                setInputError({
                  error: 'false',
                  message: ""
                })
              }}
              data-error={inputError.error}
            />
            <span>{inputError.message}</span>
          </div>

          <div>
            <p>¿Estas seguro? <br /> No hay vuelta atras</p>
            <button type="submit" disabled={!canSubmit}>Borrar</button>
          </div>
        </form>

        <div className={modalStyles.footer}>
          <button type="button" onClick={handleClose}>
            Cancelar
          </button>
          <button type="button" onClick={handleDeleteBtn}>Borrar</button>
        </div>
      </div>

    </div>

    <Toast
      message={toastMessage}
      open={toastOpen}
      icon="ok"
      closeIn={3}
    />

    </>
  )
}

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

  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)

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
    <>
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
        <button onClick={() => setModalDeleteOpen(true)}>Borrar cuenta</button>
      </div>

      <Toast
        message={toastMessage}
        secondMessage={toastSecondMessage}
        closeIn={5}
        icon="ok"
        open={toastOpen}
      />
    </div>

    <ModalDeleteAccount
      open={modalDeleteOpen}
      handleClose={() => setModalDeleteOpen(false)}
    />
    
    </>
  )
}

export default Security
