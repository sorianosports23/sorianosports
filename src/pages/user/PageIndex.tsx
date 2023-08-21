import styles from "../../css/index/index.module.css"
import CompNewsCarrousel from "../../components/index/CompNewsCarrousel"
import CompSportsGround from "../../components/index/CompSportsGround"
import CompSportsWater from "../../components/index/CompSportsWater"
import PageUser from "./PageUser"

const PageIndex = () => {
  return (    
    <PageUser>
      <div className={styles.news}>
        <CompNewsCarrousel/>
      </div>

      <div className={`${styles.sport} ${styles.ground}`}>
        <CompSportsGround/>
      </div>

      <div className={`${styles.sport} ${styles.water}`}>
        <CompSportsWater/>
      </div>
    </PageUser>
  )
}

export default PageIndex
