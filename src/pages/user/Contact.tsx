import User from "./User"
import styles from "../../css/about/Contact.module.css"
import Container from "../../components/templates/Container"
import { useContext, useEffect, useState, useCallback } from "react"
import { userSessionContext } from "../../context/session/UserSessionContext"
import apiGetUserInfo from "../../api/session/info"

const Contact = () => {

  const { token } = useContext(userSessionContext)
  const [userInfo, setUserInfo] = useState<TApiGetUserInfoResponse["data"]>({
    username: "",
    fullname: "",
    email: "",
    age: 0,
    ci: 0,
    phone: 0
  })
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  useEffect(() => {
    if (token) {
      getUserInfo()      
    }
  }, [token])

  const getUserInfo = useCallback(async () => {
    const userInfo = await apiGetUserInfo({ token })

    if (userInfo.authorization) {
      setUserInfo(userInfo.data)
    }
  }, [token])

  return (
    <User>
      <Container>
        <div className={styles.contact}>
          <form>
            <div>
              <label htmlFor="#">Nombre:</label>
              <input 
                type="text" 
                disabled={userInfo?.username ? true : false}
                value={userInfo?.username ? userInfo.fullname : userInput.name}
                onChange={(ev) => {
                  const { name, ...rest } = userInput
                  setUserInput({
                    name: ev.target.value,
                    ...rest
                  })
                }}
              />
            </div>

            <div>
              <label htmlFor="#">Correo Electronico:</label>
              <input 
                type="text" 
                value={userInput.email}
                onChange={(ev) => {
                  const { email, ...rest } = userInput
                  setUserInput({
                    email: ev.target.value,
                    ...rest
                  })
                }}
              />
            </div>

            <div>
              <label htmlFor="#">Asunto:</label>
              <input type="text"  
                value={userInput.subject}
                onChange={(ev) => {
                  const { subject, ...rest } = userInput
                  setUserInput({
                    subject: ev.target.value,
                    ...rest
                  })
                }
              }/>
            </div>

            <div>
              <label htmlFor="#">Mensaje:</label>
              <textarea  
                value={userInput.message}
                onChange={(ev) => {
                  const { message, ...rest } = userInput
                  setUserInput({
                    message: ev.target.value,
                    ...rest
                  })
                }}></textarea>
            </div>
            
            <div><button>Enviar</button></div>

          </form>
        </div>
      </Container>
    </User>
  )
}

export default Contact
