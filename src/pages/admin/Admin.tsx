import { Link } from "react-router-dom"
import styles from "../../css/admin/adminGlobal.module.css"
import { PropsWithChildren } from "react"
import { BsFillHouseFill } from "react-icons/bs"
import AdminMenu from "../../components/menu/AdminMenu"

const Admin = ({ children }: PropsWithChildren) => {
  return (
    <>
    <AdminMenu/>

    {/* <main className={styles.main}>
      <header className={styles.header}>
        <h1>Inicio</h1>

        <div className={styles.header_btns}>
          <Link to="/"><BsFillHouseFill/> <p>Pagina principal</p></Link>
        </div>
      </header>
      <div className={styles.content}>
        { children }
      </div>
    </main> */}
    </>
  )
}

export default Admin
