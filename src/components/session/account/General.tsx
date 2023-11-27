import { FormEvent, useContext, useEffect, useState, useCallback } from "react"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import styles from "../../../css/session/account/General.module.css"
import apiGetUserInfo from "../../../api/session/info"
import LoaderComp from "../../LoaderComp"
import ApiError from "../../ApiError"
import apiChangeInfo from "../../../api/session/changeInfo"
import Toast from "../../toast/Toast"

type TUserInfoInputError = {
  [key in "fullname" | "phone" | "email" | "datebirth"]: "false" | "true"
}

type TUserInfoInput = {
  [key in "name" | "email" | "ci" | "phone" | "datebirth"]: string | number
}

const USER_INFO_ERROR_DEFAULT: TUserInfoInputError = {
  fullname: "false",
  phone: "false",
  email: "false",
  datebirth: "false"
}

const General = () => {
  
  const { username, token, loadingData } = useContext(userSessionContext)
  const [userInfo, setUserInfo] = useState<TApiGetUserInfoResponse["data"]>(undefined)
  const [userInfoInput, setUserInfoInput] = useState<TUserInfoInput>({
    name: "",
    email: "",
    ci: 0,
    phone: 0,
    datebirth: Date()
  })

  const [userInfoInputError, setUserInfoInputError] = useState<TUserInfoInputError>(USER_INFO_ERROR_DEFAULT)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  //

  const toastMessage = "Datos actualizados"
  const [toastOpen, setToastOpen] = useState(false)

  //

  const handleLoadingUserData = useCallback(async () => {
    if (!token || loadingData) return
    const user = await apiGetUserInfo({ token })
    if (user.authorization) {
      setUserInfo(user.data)
      setLoading(false)
    } else {
      setLoading(false)
      setError(true)
    }
  }, [token, loadingData])
  
  useEffect(() => {
    handleLoadingUserData()
  }, [handleLoadingUserData])

  useEffect(() => {
    if (userInfo) {
      setUserInfoInput({
        name: userInfo.fullname,
        email: userInfo.email,
        ci: userInfo.ci,
        phone: userInfo.phone,
        datebirth: userInfo.age
      })
    }
  }, [userInfo])

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    setLoading(true)

    let err = false

    Object.keys(userInfoInput).map((key) => {
      const value = userInfoInput[key as keyof TUserInfoInput]

      const updateErrors = () => {
        setUserInfoInputError(prev => {
          const newInputError = prev
          if (key === "name") {
            newInputError.fullname = "true"
            return newInputError
          }
          newInputError[key as keyof TUserInfoInputError] = "true"
          return newInputError
        })
        err = true
      } 

      if (!value) updateErrors()
      if (typeof value === "number" && isNaN(value)) updateErrors()
      
      return null
    })

    if (err) {
      setLoading(false)
      return
    }
    
    const changeInfo = await apiChangeInfo({
      fullname: userInfoInput.name as string,
      email: userInfoInput.email as string,
      phone: userInfoInput.phone as number,
      age: userInfoInput.datebirth as string,
      token
    })

    if (!changeInfo.status) {
      setLoading(false)
      setUserInfoInputError(prev => {
        const key = changeInfo.err as keyof TUserInfoInputError
        return {
        ...prev,
          [key]: "true"
        }
      })
      return
    }

    setLoading(false)
    setToastOpen(true)

    setTimeout(() => {
      setToastOpen(false)
    }, 3000);
  }

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
    <>
    <div>
      <div className={styles.title}>
        {username}
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.user_info}>
          <div className={styles.input_block}>
            <label htmlFor="#">Nombre</label>
            <input type="text" value={userInfoInput.name}
              onChange={(ev) => setUserInfoInput(
                prev => {
                  const { name, ...other } = prev

                  setUserInfoInputError(prev => {
                    const {fullname, ...other} = prev
                    return {
                    ...other,
                      fullname: "false"
                    }
                  })

                  return {
                    name: ev.target.value,
                    ...other
                  }
                }
              )}
              data-error={userInfoInputError.fullname}
            />
            <span>El valor no es valido</span>
          </div>

          <div className={styles.input_block}>
            <label htmlFor="#">Correo</label>
            <input type="email" value={userInfoInput.email}
              onChange={(ev) => setUserInfoInput(prev => {
                  const {email, ...other} = prev

                  setUserInfoInputError(prev => {
                    const {email,...other} = prev
                    return {
                      ...other,
                      email: "false"
                    }
                  })
                  

                  return {
                    email: ev.target.value,
                    ...other
                  }
                }
              )}
              data-error={userInfoInputError.email}
            />
            <span>El valor no es valido</span>
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

                  setUserInfoInputError(prev => {
                    const {phone,...other} = prev
                    return {
                     ...other,
                     phone: "false"
                    }
                  })

                  return {
                    phone: ev.target.valueAsNumber,
                    ...other
                  }
                }
              )}
              data-error={userInfoInputError.phone}
            />
            <span>El valor no es valido</span>
          </div>

          <div>
            <label htmlFor="#">Fecha de Nacimiento</label>
            <input 
              type="date" 
              value={userInfoInput.datebirth}
              onChange={(ev) => setUserInfoInput(
                prev => {
                  const {datebirth, ...other} = prev

                  setUserInfoInputError(prev => {
                    const {datebirth,...other} = prev
                    return {
                     ...other,
                     datebirth: "false"
                    }
                  })

                  return {
                    datebirth: ev.target.value,
                    ...other
                  }
                }
              )}
              data-error={userInfoInputError.datebirth}
            />
            <span>El valor no es valido</span>
          </div>


          <div className={styles.input_block}>
            <button type="submit">
              Guardar cambios
            </button>
          </div>
        </div>
      </form>
    </div>

    <Toast
      message={toastMessage}
      open={toastOpen}
      closeIn={3}
      icon="ok"
    />

    </>
  )
}

export default General
