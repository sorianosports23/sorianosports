import { Link } from "react-router-dom"
import { BsFillHouseFill, BsPersonFill, BsPeopleFill, BsFillCalendarDateFill } from "react-icons/bs"
import { GiSoccerBall } from "react-icons/gi"
import styles from "../../../css/admin/header/CompHeaderAdmin.module.css"

const CompHeaderAdmin = () => {
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
            <img src={process.env.PUBLIC_URL + "assets/img/img_placeholder.png"} alt="user-img" />
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
            <BsPeopleFill/>
            Blog
          </Link>
          <Link to="/admin/">
            <BsFillCalendarDateFill/>
            Eventos
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default CompHeaderAdmin
