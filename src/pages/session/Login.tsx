import { FormEvent, useContext, useEffect, useState } from "react"
import { BsEyeFill, BsEyeSlashFill, BsFillPersonFill, BsKeyFill } from "react-icons/bs"
import styles from "../../css/session/login/Login.module.css"
import assetsFolder from "../../utils/publicfolder"
import useForm from "../../utils/useForm"
import { userSessionContext } from "../../context/session/UserSessionContext"
import { Link, useNavigate } from "react-router-dom"
import apiLogin from "../../api/session/login"
import ModalError from "../../components/modal/ModalError"
import Loader from "../../components/Loader"
import SendModal from "../../components/modal/SendModal"

const Login = () => {
  //

  const [modalOpen, setModalOpen] = useState(false)
  const [modalBody, setModalBody] = useState("")
  const [modalError, setModalError] = useState(true)

  const [showPwd, setShowPwd] = useState(false)

  const modalTitle = "Inicio de sesión"

  //

  const { login } = useContext(userSessionContext)
  const navigate = useNavigate()

  const [error, setError] = useState({
    input: "",
    message: ""
  })

  const clearError = () => {
    setError({
      input: "",
      message: ""
    })
  }

  const user = useForm("", clearError)
  const userPassword = useForm("", clearError)

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
    console.log("Submit")

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

    console.log("Response login", loginRes)

    if (!loginRes.status) {
      console.log("asd")
      if (loginRes.input && loginRes.message) {
        setError({
          input: loginRes.input,
          message: loginRes.message
        })
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

  useEffect(() => {
    document.title = "Iniciar sesión"
  }, [])

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
            {
              error.input === "username" && <span className={styles.error_msg}>{error.message}</span>
            }
          </div>

          <div className={styles.pwd}>
            <label htmlFor="#">Contraseña:</label>
            <div>
              <input 
                type={showPwd ? "text" : "password"} 
                {...userPassword}
                data-error={userPassword.data_error}
              />
              <button
                type="button"
                onClick={() => setShowPwd(prev => !prev)}
                className={styles.show_pwd}
              >
                {
                  showPwd
                  ? <BsEyeFill/>
                  : <BsEyeSlashFill/>
                }
              </button>
              <div>
                <BsKeyFill/>
              </div>
            </div>
            {
              error.input === "password" && <span className={styles.error_msg}>{error.message}</span>
            }
          </div>

          <div className={styles.register_link}>
            ¿No tienes una cuenta?
            <Link to="/auth/registro">Registrarse</Link>
          </div>

          <div className={styles.login_btn}>
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

      {/* <ModalError
        open={modalOpen}
        close={() => setModalOpen(false)}
        body={modalBody}
        title={modalTitle}
        error={modalError}
      /> */}

      <SendModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        message={modalBody}
      />
    </main>
  )
}

export default Login
