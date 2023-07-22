import { Link } from "react-router-dom"
import { BsSearch, BsFillChatSquareDotsFill, BsFillPersonFill, BsChevronDown } from "react-icons/bs"
import styles from "../../assets/css/header/CompHeader.module.css"

const stylesName = {
  link_header2: `${styles.link} ${styles["link-header2"]}`
}

const CompHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles["header-top"]}>
        <div className={styles.logo}>
          <img src={process.env.PUBLIC_URL + "/assets/img/deportesyrecreacions.png"} alt="page-logo" />
        </div>

        <div className={styles["search-bar"]}>
          <div>
            <input type="text" placeholder="¿Qué estas buscando?" />
            <button className={styles["search-bar__icon"]}>
              <BsSearch/>
            </button>
          </div>
        </div>

        <div className={styles["user-info"]}>
          <Link to="/" className={`${styles.link} ${styles["link-header"]}`}>
            <BsFillChatSquareDotsFill/>
            Ayuda
          </Link>

          <Link to="/" className={`${styles.link} ${styles["link-header"]}`}>
            <BsFillPersonFill/>
            Registrarse
          </Link>
        </div>
      </div>

      <div className={styles["header-bottom"]}>
        <nav className={styles["header-nav"]}>
          <Link to="/" className={stylesName.link_header2}>Inicio</Link>
          <div>
            <p className={stylesName.link_header2}><BsChevronDown/> Actividades</p>
          </div>
          <Link to="/" className={stylesName.link_header2}>Eventos</Link>
          <Link to="/" className={stylesName.link_header2}>Blog</Link>
          <div>
            <p className={stylesName.link_header2}><BsChevronDown/> Institución</p>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default CompHeader
