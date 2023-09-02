import { FormEvent, useContext } from "react"
import { BsFillPersonFill, BsKeyFill } from "react-icons/bs"
import styles from "../../css/session/login/PageLogin.module.css"
import assetsFolder from "../../utils/publicfolder"
import useForm from "../../utils/useForm"
import { userSessionContext } from "../../context/session/UserSessionContext"
import { useNavigate } from "react-router-dom"

const PageLogin = () => {

  const { login } = useContext(userSessionContext)
  const navigate = useNavigate()

  const user = useForm("")
  const userPassword = useForm("")

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    login("", user.value)

    navigate("/")
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
    </main>
  )
}

export default PageLogin
