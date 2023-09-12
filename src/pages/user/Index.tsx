import styles from "../../css/index/index.module.css"
import NewsCarrousel from "../../components/index/NewsCarrousel"
import YearSports from "../../components/index/YearSports"
import SportsWater from "../../components/index/SportsWater"
import User from "./User"
import SummerSportsInactive from "../../components/index/SummerSportsInactive"

const Index = () => {
  return (    
    <User>
      <div className={styles.news}>
        <NewsCarrousel/>
      </div>

      <div className={`${styles.sport} ${styles.ground}`}>
        <YearSports/>
      </div>

      <div className={`${styles.sport} ${styles.water}`}>
        {/* <SportsWater/> */}
        <SummerSportsInactive/>
      </div>
    </User>
  )
}

export default Index
