import { Link } from "react-router-dom"
import assetsFolder from "../utils/publicfolder"
import styles from "../css/404.module.css"

const Err404 = () => {
  return (
    <div className={styles.main}>
      <div className={styles.err}>
        <span>4</span>
        <img src={assetsFolder + "/../logo.png"} alt="logo" />
        <span>4</span>
      </div>

      <div className={styles.btn}>
        <Link to="/">Inicio</Link>
      </div>
    </div>
  )
}

export default Err404
