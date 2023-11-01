import { FormEvent, useContext, useEffect, useState } from "react"
import { BsFillPersonFill, BsKeyFill } from "react-icons/bs"
import styles from "../../css/session/login/Login.module.css"
import assetsFolder from "../../utils/publicfolder"
import useForm from "../../utils/useForm"
import { userSessionContext } from "../../context/session/UserSessionContext"
import { Link, useNavigate } from "react-router-dom"
import apiLogin from "../../api/session/login"
import ModalError from "../../components/modal/ModalError"
import Loader from "../../components/Loader"

const Login = () => {
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
      if (loginRes.err === "php") {
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
            <label htmlFor="#">Usuario:</label>
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
            <label htmlFor="#">Contraseña:</label>
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
            ¿No tienes una cuenta?
            <Link to="/auth/registro">Registrarse</Link>
          </div>

          <div>
            <button disabled={false}>
              {
                loadingLogin
                  ? <Loader/>
                  : "Iniciar sesión"
              }
            </button>
          </div>
        </form>
      </div>

      <ModalError
        open={modalOpen}
        close={() => setModalOpen(false)}
        body={modalBody}
        title={modalTitle}
        error={modalError}
      />
    </main>
  )
}

export default Login
