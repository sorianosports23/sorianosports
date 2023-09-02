import assetsFolder from "../../utils/publicfolder"
import styles from "../../css/session/registro/PageRegister.module.css"
import CompAccountDetails from "../../components/session/registro/CompAccountDetails"
import { ChangeEvent, useEffect, useState } from "react"
import CompUserContact from "../../components/session/registro/CompUserContact"
import CompExtraDetails from "../../components/session/registro/CompExtraDetails"
import { BsCheckAll } from "react-icons/bs"
import { Link } from "react-router-dom"

const useForm = (initialValue: any) => {
  const [value, setValue] = useState<any>(initialValue)

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value)
  }

  return {
    value,
    onChange
  }
}

const PageRegister = () => {

  ///

  const borderRadiusCircle = "0 100% 100% 0"
  const circleClipPath = "ellipse(100% 60% at 0% 50%)"
  const circle1InitialWidth = "20%"
  const circle2InitialWidth = "25%"
  const circle3InitialWidth = "30%"

  ///

  const user = useForm("")
  const userPassword = useForm("")
  const userEmail = useForm("")
  const userPhone = useForm(0)
  const userCI = useForm(0)

  const [registerSlide, setRegisterSlide] = useState(0)
  const [loadingRegister, setLoadingRegister] = useState(false)

  const handleRegister = () => {
    setLoadingRegister(true)
    setTimeout(() => {
      setLoadingRegister(false)
      setRegisterSlide(3)
    }, 3000);
  }
  

  return (
    <main className={`page-bg ${styles.main}`}>
      <div className={styles.content}>
        <div className={styles.title}>
          <img src={assetsFolder + "/../logo.png"} alt="soriano-logo" />
          <h1>Regístro</h1>
        </div>

        <div className={styles.form}>
          <div className={styles.form_content}
            style={{
              // transform: `
              //   translateX(-${21.25 * registerSlide}rem)
              // `
            }}
            data-slide={registerSlide}
          >
            <CompAccountDetails
              userInput={user}
              passwordInput={userPassword}
              buttonClick={() => setRegisterSlide(1)}
            />

            <CompUserContact
              emailInput={userEmail}
              phoneInput={userPhone}
              buttonPrevClick={() => setRegisterSlide(0)}
              buttonClick={() => setRegisterSlide(2)}
            />

            <CompExtraDetails
              ciInput={userCI}
              prevButtonClick={() => setRegisterSlide(1)}
              buttonClick={() => handleRegister()}
              loading={loadingRegister}
            />
          </div>
        </div>
      </div>

      <div className={styles.circles}>
        <div className={styles.circles_1}
          style={{
            width: registerSlide >= 3 ? "100%" : circle1InitialWidth,
            // borderRadius: registerSlide >= 3 ? "0" : borderRadiusCircle
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
            <img src={assetsFolder + "/img/silhouette_running.png"} alt="person-running" />
          </div>

          <div className={styles.circle_register_completed}
            style={{
              display: `${registerSlide === 3 ? "flex" : "none"}`,
              // transform: `${registerSlide === 3 ? "scale(1) translateX(-5rem)" : "scale(0)"}`
            }}
            data-ready={registerSlide === 3}
          >
            <div>
              <h1>Registro completo</h1>
              <Link to="/auth/login">Iniciar sesión</Link>
            </div>

            <div>
              <BsCheckAll/>
            </div>
          </div>
        </div>
        <div className={styles.circles_2}
          style={{
            width: registerSlide >= 2 ? "100%" : circle2InitialWidth,
            // borderRadius: registerSlide >= 2 ? "0" : borderRadiusCircle
            clipPath: registerSlide >= 2 ? "unset" : circleClipPath
          }}
          data-open={registerSlide >= 2}
        ></div>
        <div className={styles.circles_3}
          style={{
            width: registerSlide >= 1 ? "100%" : circle3InitialWidth,
            // borderRadius: registerSlide >= 1 ? "0" : borderRadiusCircle
            clipPath: registerSlide >= 1 ? "unset" : circleClipPath
          }}
          data-open={registerSlide >= 1}
        ></div>
      </div>
    </main>
  )
}

export default PageRegister
