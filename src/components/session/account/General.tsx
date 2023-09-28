import { useContext, useEffect, useState } from "react"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import styles from "../../../css/session/account/General.module.css"
import apiGetUserInfo from "../../../api/session/info"
import LoaderComp from "../../LoaderComp"
import ApiError from "../../ApiError"

const General = () => {
  
  const { username, token } = useContext(userSessionContext)
  const [userInfo, setUserInfo] = useState<TApiGetUserInfoResponse["data"]>(undefined)
  const [userInfoInput, setUserInfoInput] = useState({
    name: "",
    email: "",
    ci: 0,
    phone: 0
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    (async () => {
      const user = await apiGetUserInfo({ token })
      if (user.authorization) {
        setUserInfo(user.data)
        setLoading(false)
      } else {
        setLoading(false)
        setError(true)
      }
    })()
  }, [token])

  useEffect(() => {
    if (userInfo) {
      setUserInfoInput({
        name: userInfo.username,
        email: userInfo.email,
        ci: userInfo.ci,
        phone: userInfo.phone
      })
    }
  }, [userInfo])

  if (loading) return (
    <div>
      <LoaderComp/>
    </div>
  )

  if (error) return (
    <div>
      <ApiError/> 
    </div>
  )

  return (
    <div>
      <div className={styles.title}>
        {username}
      </div>

      <div className={styles.user_info}>
        <div className={styles.input_block}>
          <label htmlFor="#">Nombre</label>
          <input type="text" value={userInfoInput.name}
            onChange={(ev) => setUserInfoInput(
              prev => {
                const { name, ...other } = prev

                return {
                  name: ev.target.value,
                  ...other
                }
              }
            )}
          />
        </div>

        <div className={styles.input_block}>
          <label htmlFor="#">Correo</label>
          <input type="email" value={userInfoInput.email}
            onChange={(ev) => setUserInfoInput(
              prev => {
                const {email, ...other} = prev

                return {
                  email: ev.target.value,
                  ...other
                }
              }
            )}
          />
        </div>

        <div>
          <label htmlFor="#">Cedula</label>
          <input type="number" maxLength={8} value={userInfoInput.ci}
            onChange={(ev) => setUserInfoInput(
              prev => {
                const {ci, ...other} = prev

                return {
                  ci: ev.target.valueAsNumber,
                  ...other
                }
              }
            )}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="#">Telefono</label>
          <input type="number" maxLength={9} value={userInfoInput.phone}
            onChange={(ev) => setUserInfoInput(
              prev => {
                const {phone, ...other} = prev

                return {
                  phone: ev.target.valueAsNumber,
                  ...other
                }
              }
            )}
          />
        </div>


        <div className={styles.input_block}>
          <button>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  )
}

export default General
