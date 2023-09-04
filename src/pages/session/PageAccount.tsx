import { useContext, useEffect, useState } from "react"
import PageUser from "../user/PageUser"
import { userSessionContext } from "../../context/session/UserSessionContext"
import { useNavigate } from "react-router-dom"
import CompAccountMenu from "../../components/menu/CompAccountMenu"
import CompGeneral from "../../components/session/account/CompGeneral"
import styles from "../../css/session/account/PageAccount.module.css"

type TMenu = "general" | "inscripciones" | "seguridad"

const accountMenus: Readonly<{ [key in TMenu]: JSX.Element }> = Object.freeze({
  general: <CompGeneral/>,
  inscripciones: <></>,
  seguridad: <></>
})

const PageAccount = () => {

  const navigate = useNavigate()
  const { username } = useContext(userSessionContext)

  const [menuSelected, setMenuSelected] = useState<TMenu>("general")

  useEffect(() => {
    if (!username) {
      navigate("/auth/login")
    }
  }, [username, navigate])
  
  return (
    <PageUser>
      <div className={styles.user_profile}>
        <CompAccountMenu
          menuSelected={menuSelected}
          selectMenu={(menu) => setMenuSelected(menu as TMenu)}
        />

        {
          accountMenus[menuSelected]
        }
      </div>
    </PageUser>
  )
}

export default PageAccount