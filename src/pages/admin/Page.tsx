import { Link } from "react-router-dom"
import Admin from "./Admin"
import styles from "../../css/admin/page/Page.module.css"

const Page = () => {
  return (
    <Admin route_title="Página">
      <div className={styles.links}>
<<<<<<< HEAD
        <Link to="/admin/edit/directive">Editar directiva</Link>
=======
        <Link to="/admin/edit/directive">Editar /institucion/directiva</Link>
>>>>>>> 03a658944beda1d764bfe0ce95c19287d6f55b81
      </div>
    </Admin>
  )
}

export default Page
