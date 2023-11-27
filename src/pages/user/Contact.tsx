import User from "./User"
import styles from "../../css/about/Contact.module.css"
import Container from "../../components/templates/Container"
import { useContext, useEffect, useState, useCallback, FormEvent } from "react"
import { userSessionContext } from "../../context/session/UserSessionContext"
import apiGetUserInfo from "../../api/session/info"
import apiSendContact from "../../api/page/contact/sendContact"
import SendModal from "../../components/modal/SendModal"
import { EApiContactInputsErr } from "../../api/page/contact/types"

const Contact = () => {

  const { token, username } = useContext(userSessionContext)
  const [userInfo, setUserInfo] = useState<TApiGetUserInfoResponse["data"]>({
    username: "",
    fullname: "",
    email: "",
    ci: 0,
    phone: 0,
    age: Date()
  })
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const [userErrors, setUserErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  })

  const getUserInfo = useCallback(async () => {
    const userInfo = await apiGetUserInfo({ token })

    if (userInfo.authorization) {
      setUserInfo(userInfo.data)
      setUserInput(prev => {
        const { name, email, ...rest } = prev
        return {
          name: userInfo.data?.fullname as string,
          email: userInfo.data?.email as string,
          ...rest
        }
      })
    }
  }, [token])

  useEffect(() => {
    if (token) {
      getUserInfo()      
    }
  }, [token, getUserInfo])


  const handleSendForm = async (ev: FormEvent) => {
    ev.preventDefault()
    const contactData = await apiSendContact({
      username,
      ...userInput
    })
    if (contactData.status) {
      setModalMessage("Se envio correctamente el mensaje")
      setModalOpen(true)
      setUserInput(prev => {
        const { subject, message, ...rest } = prev
        return {
          ...rest,
          subject: "",
          message: ""
        }
      })
    } else {
      const errName = contactData.err
      setUserErrors(prev => {
        const { [EApiContactInputsErr[errName as keyof typeof EApiContactInputsErr]]: inputV, ...rest } = prev
        return {
          [EApiContactInputsErr[errName as keyof typeof EApiContactInputsErr]]: true,
          ...rest
        }
      })
    }
  }

  //modal
  const [modalMessage, setModalMessage] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
    <User pageTitle="Contacto">
      <Container>
        <div className={styles.contact}>
          <form onSubmit={handleSendForm}>
            <div>
              <label htmlFor="#">Nombre Completo:</label>
              <input 
                type="text" 
                disabled={userInfo?.fullname ? true : false}
                value={userInfo?.fullname ? userInfo.fullname : userInput.name}
                onChange={(ev) => {
                  const { name, ...rest } = userInput
                  setUserInput({
                    name: ev.target.value,
                    ...rest
                  })
                  setUserErrors(prev => {
                    const { name, ...rest } = prev
                    return {
                      name: false,
                      ...rest
                    }
                  })
                }}
                data-invalid={userErrors.name}
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
                  setUserErrors(prev => {
                    const { email, ...rest } = prev
                    return {
                      email: false,
                      ...rest
                    }
                  })
                }}
                data-invalid={userErrors.email}
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
                  setUserErrors(prev => {
                    const { subject, ...rest } = prev
                    return {
                      subject: false,
                      ...rest
                    }
                  })
                }}
                data-invalid={userErrors.subject}
            />
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
                  setUserErrors(prev => {
                    const { message, ...rest } = prev
                    return {
                      message: false,
                      ...rest
                    }
                  })
                }}
                data-invalid={userErrors.message}
              >

                </textarea>
            </div>
            
            <div><button type="submit">Enviar</button></div>

          </form>
        </div>
      </Container>

    </User>
    
    <SendModal
      message={modalMessage}
      open={modalOpen}
      close={() => setModalOpen(false)}
    />

    </>
  )
}

export default Contact
