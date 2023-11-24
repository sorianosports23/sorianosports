import { Link } from "react-router-dom"
import styles from "../../css/index/GreatEvents.module.css"
import UseTime from "./UseTime"
import assetsFolder from "../../utils/publicfolder"

const GreatEvents = () => {
  return (
    <div className={styles.cont}>
      <div className={styles.event}>
        <div className={styles.time_cont}>
          <UseTime/>
        </div>

        <div className={styles.info}>
          <h2>Guerrero Fertil</h2>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, iusto nulla, praesentium aut fuga id molestiae, ullam natus sint dicta recusandae ipsa? Quasi animi labore, illo exercitationem consequuntur similique sapiente.</p>
          <Link to="/">Ver más</Link>
        </div>

      </div>

      <div className={styles.bg}>
        <div className={styles.triangle} style={{backgroundImage: `url(${assetsFolder}/img/greatevent_polygon.svg)`}}/>
        <img src="http://localhost/api/events/getImage.php?id=2" alt="ge-img" />
      </div>
    </div>
  )  
} 

export default GreatEvents;
