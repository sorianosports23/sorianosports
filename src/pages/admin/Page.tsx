import { Link } from "react-router-dom"
import Admin from "./Admin"
import styles from "../../css/admin/page/Page.module.css"

const Page = () => {
  return (
    <Admin route_title="Página">
      <div className={styles.links}>
        <Link to="/admin/edit/directive">Editar equipo</Link>
        <Link to="/admin/edit/keywords">Editar busqueda</Link>
        <Link to="/admin/edit/social">Editar redes sociales</Link>
      </div>
    </Admin>
  )
}

export default Page
