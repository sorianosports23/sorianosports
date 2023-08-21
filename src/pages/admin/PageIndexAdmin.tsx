import { Link } from "react-router-dom"
import { BsFillHouseFill } from "react-icons/bs"
import CompDashboard from "../../components/admin/index/CompDashboard"
import CompHeaderAdmin from "../../components/admin/templates/CompHeaderAdmin"
import styles from "../../css/admin/index/PageAdmin.module.css"

const PageIndexAdmin = () => {
  return (
    <>
    <CompHeaderAdmin/>

    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Inicio</h1>

        <div className={styles.header_btns}>
          <Link to="/"><BsFillHouseFill/> <p>Pagina principal</p></Link>
        </div>
      </header>
      <div className={styles.content}>
        <CompDashboard/>
      </div>
    </main>
    </>
  )
}

export default PageIndexAdmin
