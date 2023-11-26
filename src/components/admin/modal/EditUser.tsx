import { BsXLg } from "react-icons/bs"
import modalStyles from "../../../css/Modal.module.css"
import styles from "../../../css/admin/users/EditUser.module.css"
import { useContext, useState, FormEvent, useCallback, useEffect } from "react"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiAdminGenPass from "../../../api/admin/users/generatePass"
import LoaderComp from "../../LoaderComp"
import Loader from "../../Loader"
import apiAdminManagePerm from "../../../api/admin/users/managePerm"
import useCloseModalKey from "../../../utils/useCloseModalKey"

type TEditUserProps = {
  open: boolean
  close: () => void
  info: TUser
  openSend: (msg: string, otMsg: string, loadUsers: boolean) => void
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

const EditUser = ({ open, close, info, openSend }: TEditUserProps) => {

  const {token} = useContext(userSessionContext)

  const [generatedNewPassword, setGeneratedNewPassword] = useState(false)
  const [newPasswordGen, setNewPasswordGen] = useState("")
  const [generatingPassword, setGeneratingPassword] = useState(false)
  const [genPassErr, setGenPassErr] = useState(false)
  const [grantingPerm, setGrantingPerm] = useState(false)

  const getButtonGrantPerm = useCallback((type: TPermission) => {
    const hasPerm = info.permissions.includes(type)
    const permLabel = type === "admin" ? "Administrador" : "Editor"
    return (
      <button
        type="button"
        onClick={() => handleModifyPermission(type, !hasPerm)}
      >
        {
          hasPerm
            ? `Revocar permisos de ${permLabel}`
            : `Dar permisos de ${permLabel}`  
        }
      </button>
      )  
  }, [info])

  const [adminBtn, setAdminBtn] = useState(getButtonGrantPerm("admin"))
  const [editorBtn, setEditorBtn] = useState(getButtonGrantPerm("editor"))

  useEffect(() => {
    setAdminBtn(getButtonGrantPerm("admin"))
    setEditorBtn(getButtonGrantPerm("editor"))
  }, [getButtonGrantPerm])

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

    if (res.status) {
      close()
      const msg = grant 
        ? "Se añadio el permiso"
        : "Se elimino el permiso"
      openSend(msg, "", true)
    } else {
      const msg = grant
        ? "No se pudo añadir el permiso"
        : "No se pudo eliminar el permiso"
      openSend(msg, "", false)
    }

    setGrantingPerm(false)
  }

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
  }

  return (
    <div
      className={modalStyles.cont}
      data-open={open}
      {...useCloseModalKey({ open, close })}
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
            <label htmlFor="#">Fecha de Nacimiento:</label> <span>{info.age}</span>
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
            {/* <button
              onClick={() => handleModifyPermission("admin", true)}
              type="button"
              disabled={grantingPerm}
            >
              Dar permisos de administrador
            </button> */}
            {
              adminBtn
            }
            {/* <button
              onClick={() => handleModifyPermission("editor", true)}
              type="button"
              disabled={grantingPerm}
            >
              Dar permisos de editor
            </button> */}
            {
              editorBtn
            }
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
