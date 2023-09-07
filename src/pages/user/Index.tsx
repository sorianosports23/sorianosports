import styles from "../../css/index/index.module.css"
import NewsCarrousel from "../../components/index/NewsCarrousel"
import SportsGround from "../../components/index/SportsGround"
import SportsWater from "../../components/index/SportsWater"
import User from "./User"

const Index = () => {
  return (    
    <User>
      <div className={styles.news}>
        <NewsCarrousel/>
      </div>

      <div className={`${styles.sport} ${styles.ground}`}>
        <SportsGround/>
      </div>

      {/* <div className={`${styles.sport} ${styles.water}`}>
        <SportsWater/>
      </div> */}
    </User>
  )
}

export default Index
