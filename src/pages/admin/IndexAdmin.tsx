import { useContext } from "react"
import Dashboard from "../../components/admin/index/Dashboard"
import Admin from "./Admin"
import { userSessionContext } from "../../context/session/UserSessionContext"

enum EPermission {
  admin = "Administrador",
  editor = "Editor"
}

const permissionText: Readonly<{admin: string, editor: string}> = {
  admin: "Puedes administrar toda la página accediendo desde la navegaciónn",
  editor: "Puedes editar información de la página accediendo desde la navegación"
}

const IndexAdmin = () => {

  const { permissions, username } = useContext(userSessionContext)

  return (
    <Admin route_title="Inicio">
      <Dashboard/>
      <h2>
        Bievenid@ {username}
        <br />
        Tienes permisos de {EPermission[permissions[0]]} 
      </h2>
      <p
        style={{
          textAlign: "center",
          marginTop: "1rem"
        }}
      >
        {
          permissionText[permissions[0]]
        }
      </p>
    </Admin>
  )
}

export default IndexAdmin
