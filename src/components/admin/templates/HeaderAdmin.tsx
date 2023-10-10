import { Link } from "react-router-dom"
import { BsFillHouseFill, BsPersonFill, BsFillDatabaseFill, BsNewspaper, BsFillCalendarDateFill } from "react-icons/bs"
import { GiSoccerBall } from "react-icons/gi"
import styles from "../../../css/admin/header/HeaderAdmin.module.css"
import assetsFolder from "../../../utils/publicfolder"

const HeaderAdmin = () => {
  return (
    <header className={styles.header} id="admin-header">
      <div className={styles.title}>
        <h1>Deportes y Recreación</h1>
        <p>Admin</p>
      </div>

      <div className={styles.content}>
        {/* usuario */}
        <div className={styles.user}>
          <div>
            <img src={assetsFolder + "/img/img_placeholder.png"} alt="user-img" />
          </div>
          <p>Usuario</p>
        </div>

        {/* navegacion */}

        <div className={styles.divisor}></div>

        <nav className={styles.nav}>
          <Link to="/admin/" className={styles.nav_selected}>
            <BsFillHouseFill/>
            Inicio
          </Link>
          <Link to="/admin/">
            <BsPersonFill/>
            Usuarios
          </Link>
          <Link to="/admin/">
            <GiSoccerBall/>
            Deportes
          </Link>
          <Link to="/admin/">
            <BsFillCalendarDateFill/>
            Eventos
          </Link>
          <Link to="/admin/">
            <BsFillDatabaseFill/>
            Base de datos
          </Link>
          <Link to="/admin/news">
            <BsNewspaper/>
            Noticias
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default HeaderAdmin
