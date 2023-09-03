import { FormEvent, useContext, useEffect, useState } from "react"
import { BsFillPersonFill, BsKeyFill } from "react-icons/bs"
import styles from "../../css/session/login/PageLogin.module.css"
import assetsFolder from "../../utils/publicfolder"
import useForm from "../../utils/useForm"
import { userSessionContext } from "../../context/session/UserSessionContext"
import { useNavigate } from "react-router-dom"
import apiLogin from "../../api/session/login"
import CompModal from "../../components/modal/CompModal"
import CompLoader from "../../components/CompLoader"

const PageLogin = () => {
  //

  const [modalOpen, setModalOpen] = useState(false)
  const [modalBody, setModalBody] = useState("")
  const [modalError, setModalError] = useState(true)

  const modalTitle = "Inicio de sesión"

  //

  const { login } = useContext(userSessionContext)
  const navigate = useNavigate()

  const user = useForm("")
  const userPassword = useForm("")

  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [loadingLogin, setLoadingLogin] = useState(false)

  useEffect(() => {
    if (user.data_error || userPassword.data_error) return setSubmitDisabled(true)
    setSubmitDisabled(false)
  }, [user.data_error, userPassword.data_error])

  useEffect(() => {
    if (loadingLogin) setSubmitDisabled(true)
  }, [loadingLogin])

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if (!user.value || !userPassword.value) {
      setModalBody("Debes ingresar todos los campos")
      setModalError(false)
      setModalOpen(true)
      return
    }

    setLoadingLogin(true)
    
    const userData: TApiLoginRequest = {
      username: user.value,
      password: userPassword.value
    }

    const loginRes = await apiLogin(userData)

    console.log(loginRes)

    if (!loginRes.status) {
      if (loginRes.message !== "Ocurrio un error al intentar iniciar sesión") {
        setModalBody(loginRes.message)
        setModalError(false)
        setModalOpen(true)
      } else {
        setModalBody(loginRes.message)
        setModalError(true)
        setModalOpen(true)
      }
    } else {
      login(loginRes.token as string, user.value)
      navigate("/")
    }

    setLoadingLogin(false)
    setSubmitDisabled(false)
  }

  return (
    <main className={styles.main}>
      <div className={styles.form_content}>

        <div className={styles.title}>
          <div>
            <img src={assetsFolder + "/../logo.png"} alt="logo"/>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="#">Usuario</label>
            <div>
              <input type="text" 
                {...user}
                data-error={user.data_error}
              />
              <div>
                <BsFillPersonFill/>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="#">Contraseña</label>
            <div>
              <input type="password" 
                {...userPassword}
                data-error={userPassword.data_error}
              />
              <div>
                <BsKeyFill/>
              </div>
            </div>
          </div>

          <div>
            <button disabled={submitDisabled}>
              {
                loadingLogin
                  ? <CompLoader/>
                  : "Iniciar sesión"
              }
            </button>
          </div>
        </form>
      </div>

      <CompModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        body={modalBody}
        title={modalTitle}
        error={modalError}
      />
    </main>
  )
}

export default PageLogin
