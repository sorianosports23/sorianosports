import { BsXLg } from "react-icons/bs"
import modalStyles from "../../../css/Modal.module.css"
import styles from "../../../css/admin/users/EditUser.module.css"
import { useContext, useState, FormEvent } from "react"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiAdminGenPass from "../../../api/admin/users/generatePass"
import LoaderComp from "../../LoaderComp"
import Loader from "../../Loader"
import apiAdminManagePerm from "../../../api/admin/users/managePerm"

type TEditUserProps = {
  open: boolean
  close: () => void
  info: TUser
}

const ABC = "ABCDEFGHIJKLMNOPQRSTWXYZ"
const CARACT = "1234567890!@$"

const getRandomCaractFromABC = (uppercase: boolean) => {
  const ran = Math.floor(Math.random() * ABC.length)
  let letter = ""
  
  uppercase
    ? letter = ABC[ran]
    : letter = ABC[ran].toLowerCase()

  return letter
}

const getRandomCaractFromCaract = () => {
  const ran = Math.floor(Math.random() * CARACT.length)
  return CARACT[ran]
}

const generateNewPassword = () => {
  let newPassword = ""
  for (let i = 0; i < 12; i++) {
    const ran = Math.floor(Math.random() * 3)
    switch (ran) {
      case 0:
        newPassword += getRandomCaractFromABC(true)
        break;
      case 1:
        newPassword += getRandomCaractFromABC(false)
        break;
      case 2:
        newPassword += getRandomCaractFromCaract()
        break;
    }
  }
  return newPassword
}

const EditUser = ({ open, close, info }: TEditUserProps) => {

  const {token} = useContext(userSessionContext)

  const [generatedNewPassword, setGeneratedNewPassword] = useState(false)
  const [newPasswordGen, setNewPasswordGen] = useState("")
  const [generatingPassword, setGeneratingPassword] = useState(false)
  const [genPassErr, setGenPassErr] = useState(false)
  const [grantingPerm, setGrantingPerm] = useState(false)

  const handleGenerateNewPassword = async () => {
    const newPass = generateNewPassword()
    setGeneratingPassword(true)

    const data = {
      token,
      username: info.username,
      password: newPass
    }

    const res = await apiAdminGenPass(data)

    if (res.status) {
      setNewPasswordGen(newPass)
      setGeneratedNewPassword(true)
    } else {
      setGenPassErr(true)
    }
    
    setGeneratingPassword(false)

  }

  const handleModifyPermission = async (perm: "admin" | "editor", grant: boolean) => {
    setGrantingPerm(true)

    const data = {
      token,
      username: info.username,
      permission: perm,
      grant
    }

    const res = await apiAdminManagePerm(data)

    setGrantingPerm(false)
  }

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
  }

  return (
    <div
      className={modalStyles.cont}
      data-open={open}
    >
      <form className={modalStyles.modal} onSubmit={handleSubmit}>
        <div className={modalStyles.header}>
          <h2>Editar usuario</h2>
          <button onClick={close} type="button">
            <BsXLg/>
          </button>
        </div>

        <div className={styles.body}>
          <h3>{info.fullname} - {info.username}</h3>
          <div className={styles.info}>
            <label htmlFor="#">CI:</label> <span>{info.ci}</span>
          </div>
          <div className={styles.info}>
            <label htmlFor="#">Edad:</label> <span>{info.age}</span>
          </div>
          <div className={styles.info}>
            <label htmlFor="#">Correo:</label> <span>{info.email}</span>
          </div>
          <div className={styles.info}>
            <label htmlFor="#">Telefóno:</label> <span>{info.phone}</span>
          </div>

          <h3>Acciones</h3>

          <div className={styles.btns}>
            <button
              onClick={handleGenerateNewPassword}
              type="button"
            >
              Generar nueva contraseña
            </button>
            {
              generatingPassword && <Loader/>
            }
            {
              generatedNewPassword &&
              (
                <>
                <p>Nueva contraseña generada:</p>
                <span>{newPasswordGen}</span>
                </>
              )
            }
            {
              genPassErr && <p>Ocurrio un error generando la contraseña</p>
            }
          </div>

          <div className={styles.btns}>
            <button
              onClick={() => handleModifyPermission("admin", true)}
              type="button"
              disabled={grantingPerm}
            >
              Dar permisos de administrador
            </button>
            <button
              onClick={() => handleModifyPermission("editor", true)}
              type="button"
              disabled={grantingPerm}
            >
              Dar permisos de editor
            </button>
          </div>
        </div>

        <div className={`${modalStyles.footer} ${modalStyles.btns}`}>
          <button
            className={modalStyles.btn_cancel}
            type="button"
            onClick={close}
          >
            Cancelar
          </button>

          <button
            className={modalStyles.btn_accept}
            type="submit"
          >
            Editar
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditUser
