import assetsFolder from "../../utils/publicfolder"
import styles from "../../css/session/registro/Register.module.css"
import AccountDetails from "../../components/session/registro/AccountDetails"
import { useState, useEffect } from "react"
import UserContact from "../../components/session/registro/UserContact"
import ExtraDetails from "../../components/session/registro/ExtraDetails"
import { BsCheckAll } from "react-icons/bs"
import { Link } from "react-router-dom"
import useForm from "../../utils/useForm"
import apiRegister from "../../api/session/register"
import SendModal from "../../components/modal/SendModal"



const Register = () => {
  ///

  const circleClipPath = "ellipse(100% 60% at 0% 50%)"
  const circle1InitialWidth = "20%"
  const circle2InitialWidth = "25%"
  const circle3InitialWidth = "30%"

  ///

  ///

  const [modalOpen, setModalOpen] = useState(false)
  const [modalBody, setModalBody] = useState("")

  ///

  const user = useForm("")
  const userFullname = useForm("")
  const userPassword = useForm("", 8)
  const userEmail = useForm("")
  const userPhone = useForm(0, 9)
  const userCI = useForm(0, 8)
  const userAge = useForm("")

  const errorInputName = "data_error"

  ///

  const [submitDisabled, setSubmitDisabled] = useState(true)

  useEffect(() => {
    if (user.data_error) return setSubmitDisabled(true)
    if (userPassword.data_error) return setSubmitDisabled(true)
    if (userEmail.data_error) return setSubmitDisabled(true)
    if (userPhone.data_error) return setSubmitDisabled(true)
    if (userCI.data_error) return setSubmitDisabled(true)
    setSubmitDisabled(false)
  }, [user.data_error, userPassword.data_error, userEmail.data_error, userPhone.data_error, userCI.data_error])

  ///

  const [registerSlide, setRegisterSlide] = useState(0)
  const [loadingRegister, setLoadingRegister] = useState(false)

  useEffect(() => {
    if (loadingRegister) setSubmitDisabled(true)
  }, [loadingRegister])


  const handleRegister = async () => {

    if (!user.value || !userPassword.value || !userEmail.value || !userPhone.value || !userCI.value) {
      setModalBody("Debes ingresar todos los campos")
      setModalOpen(true)
      return
    }

    setLoadingRegister(true)

    const userData: TApiRegisterRequest = {
      username: user.value,
      fullname: userFullname.value,
      password: userPassword.value,
      email: userEmail.value,
      age: userAge.value,
      phone: userPhone.value,
      ci: userCI.value
    }

    const register = await apiRegister(userData)

    console.log(register)

    if (!register.status) {
      setModalBody(register.message)
      setLoadingRegister(false)
      setModalOpen(true)
    } else {
      setLoadingRegister(false)
      setRegisterSlide(3)
    }
  }
  
  useEffect(() => {
    document.title = "Registro de usuario"
  }, [])

  return (
    <main className={`page-bg ${styles.main}`}>
      <div className={styles.content}>
        <div className={styles.title}>
          <img src={process.env.PUBLIC_URL + "/../logo.png"} alt="soriano-logo" />
          <h1>Regístro</h1>
        </div>

        <div className={styles.form}>
          <div 
            className={styles.form_content}
            data-slide={registerSlide}
          >
            <AccountDetails
              userInput={user}
              passwordInput={userPassword}
              buttonClick={() => setRegisterSlide(1)}
              errorInputs={{
                username: user[errorInputName],
                password: userPassword[errorInputName]
              }}
            />

            <UserContact
              emailInput={userEmail}
              phoneInput={userPhone}
              fullnameInput={userFullname}
              buttonPrevClick={() => setRegisterSlide(0)}
              buttonClick={() => setRegisterSlide(2)}
              errorInputs={{
                email: userEmail[errorInputName],
                phone: userPhone[errorInputName]
              }}
            />

            <ExtraDetails
              ciInput={userCI}
              ageInput={userAge}
              prevButtonClick={() => setRegisterSlide(1)}
              buttonClick={() => handleRegister()}
              loading={loadingRegister}
              errorInputs={{
                ci: userCI[errorInputName],
                age: "false"
              }}
              buttonDisabled={submitDisabled}
            />
          </div>
        </div>
      </div>

      <div className={styles.circles}>
        <div className={styles.circles_1}
          style={{
            width: registerSlide >= 3 ? "100%" : circle1InitialWidth,
            clipPath: registerSlide >= 3 ? "unset" : circleClipPath
          }}
          data-open={registerSlide >= 3}
        >
          <div className={styles.circle_img}
            style={{
              animationName: `
                ${registerSlide === 3 ? styles.disappear : "none"}
              `
            }}
          >
            <img src={process.env.PUBLIC_URL + "/../assets/img/silhouette_running.png"} alt="person-running" />
          </div>

          <div className={styles.circle_register_completed}
            style={{
              display: `${registerSlide === 3 ? "flex" : "none"}`,
            }}
            data-ready={registerSlide === 3}
          >
            <div>
              <h1>Registro completo</h1>
            </div>

            <div>
              <BsCheckAll/>
            </div>

            <div>
              <Link to="/auth/login">Iniciar sesión</Link>
            </div>
          </div>
        </div>
        <div className={styles.circles_2}
          style={{
            width: registerSlide >= 2 ? "100%" : circle2InitialWidth,
            clipPath: registerSlide >= 2 ? "unset" : circleClipPath
          }}
          data-open={registerSlide >= 2}
        ></div>
        <div className={styles.circles_3}
          style={{
            width: registerSlide >= 1 ? "100%" : circle3InitialWidth,
            clipPath: registerSlide >= 1 ? "unset" : circleClipPath
          }}
          data-open={registerSlide >= 1}
        ></div>
      </div>

      <SendModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        message={modalBody}
      />
    </main>
  )
}

export default Register
