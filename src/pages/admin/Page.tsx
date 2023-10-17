import { Link } from "react-router-dom"
import Admin from "./Admin"

const Page = () => {
  return (
    <Admin route_title="Página">
      <Link to="/admin/edit/directive">Editar /institucion/directiva</Link>
    </Admin>
  )
}

export default Page
