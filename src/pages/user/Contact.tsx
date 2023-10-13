import User from "./User"
import styles from "../../css/about/Contact.module.css"
import Container from "../../components/templates/Container"
import { useContext, useEffect, useState, useCallback, FormEvent } from "react"
import { userSessionContext } from "../../context/session/UserSessionContext"
import apiGetUserInfo from "../../api/session/info"
import apiSendContact from "../../api/page/contact/sendContact"

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
    console.log(userInfo)

    if (userInfo.authorization) {
      setUserInfo(userInfo.data)
      setUserInput(prev => {
        const { name, email, ...rest } = prev
        return {
          name: userInfo.data?.username as string,
          email: userInfo.data?.email as string,
          ...rest
        }
      })
    }
  }, [token])

  const handleSendForm = async (ev: FormEvent) => {
    ev.preventDefault()
    const contactData = await apiSendContact(userInput)
    console.log(contactData)
  }

  return (
    <User>
      <Container>
        <div className={styles.contact}>
          <form onSubmit={handleSendForm}>
            <div>
              <label htmlFor="#">Nombre Completo:</label>
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
                disabled={userInfo?.email ? true : false}
                value={userInfo?.email ? userInfo.email : userInput.email}
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
            
            <div><button type="submit">Enviar</button></div>

          </form>
        </div>
      </Container>
    </User>
  )
}

export default Contact
