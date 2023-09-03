import { FormEvent, useContext, useState } from "react"
import { BsFillPersonFill, BsKeyFill } from "react-icons/bs"
import styles from "../../css/session/login/PageLogin.module.css"
import assetsFolder from "../../utils/publicfolder"
import useForm from "../../utils/useForm"
import { userSessionContext } from "../../context/session/UserSessionContext"
import { useNavigate } from "react-router-dom"
import apiLogin from "../../api/session/login"
import CompModal from "../../components/modal/CompModal"

const PageLogin = () => {


  //

  const [modalOpen, setModalOpen] = useState(false)
  const [modalBody, setModalBody] = useState("")

  const modalTitle = "Inicio de sesión"

  //

  const { login } = useContext(userSessionContext)
  const navigate = useNavigate()

  const user = useForm("")
  const userPassword = useForm("")

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    
    const userData: TApiLoginRequest = {
      username: user.value,
      password: userPassword.value
    }

    const loginRes = await apiLogin(userData)

    console.log(loginRes)

    if (!loginRes.status) {
      if (!loginRes.messageError) {
        setModalBody(loginRes.message)
        setModalOpen(true)
      } else {
        
      }
    } else {
      login(loginRes.token as string, user.value)
      navigate("/")
    }

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
              />
              <div>
                <BsKeyFill/>
              </div>
            </div>
          </div>

          <div>
            <button>Iniciar sesión</button>
          </div>
        </form>
      </div>

      <CompModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        body={modalBody}
        title={modalTitle}
        error={true}
      />
    </main>
  )
}

export default PageLogin
