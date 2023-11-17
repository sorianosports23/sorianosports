import { useContext, useEffect, useState } from "react"
import User from "../user/User"
import { userSessionContext } from "../../context/session/UserSessionContext"
import { useNavigate } from "react-router-dom"
import AccountMenu from "../../components/menu/AccountMenu"
import General from "../../components/session/account/General"
import styles from "../../css/session/account/Account.module.css"
import Inscriptions from "../../components/session/account/Inscriptions"
import Security from "../../components/session/account/Security"
import SendModal from "../../components/modal/SendModal"

type TMenu = "general" | "inscripciones" | "seguridad"

const accountMenus: Readonly<{ [key in TMenu]: JSX.Element }> = Object.freeze({
  general: <General/>,
  inscripciones: <Inscriptions/>,
  seguridad: <Security/>
})

const Account = () => {

  const navigate = useNavigate()
  const { username } = useContext(userSessionContext)

  const [menuSelected, setMenuSelected] = useState<TMenu>("general")

  useEffect(() => {
    if (!username) {
      navigate("/auth/login")
    }
  }, [username, navigate])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params) {
      const menu = params.get("location") as TMenu
      if (accountMenus[menu]) {
        setMenuSelected(menu)
      }
    }
  }, [])
  
  return (
    <User>
      <div className={styles.user_profile}>
        <AccountMenu
          menuSelected={menuSelected}
          selectMenu={(menu) => setMenuSelected(menu as TMenu)}
        />

        {
          accountMenus[menuSelected]
        }
      </div>
    </User>
  )
}

export default Account