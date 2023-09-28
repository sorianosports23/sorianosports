import styles from "../../css/index/index.module.css"
import NewsCarrousel from "../../components/index/NewsCarrousel"
import YearSports from "../../components/index/YearSports"
import SportsWater from "../../components/index/SportsWater"
import User from "./User"
import SummerSportsInactive from "../../components/index/SummerSportsInactive"
import YearSportsInactive from "../../components/index/YearSportsInactive"
import SummerSports from "../../components/index/SummerSports"
import { useEffect, useState } from "react"

const Index = () => {

  const [yearSports, setYearSports] = useState(false)

  const checkDayForActivities = () => {
    const date = new Date()
    const month = date.getMonth()
    if (month >= 12 || month <= 2) {
      setYearSports(false)
    } else {
      setYearSports(true)
    }
  }

  useEffect(() => {
    checkDayForActivities()
  })

  return (    
    <User>
      <div className={styles.news}>
        <NewsCarrousel/>
      </div>

      <div className={`${styles.sport} ${styles.ground}`}>
        {/* <YearSports/> */}
        {/* <SummerSports/> */}
        {
          yearSports 
            ? <YearSports/>
            : <SummerSports/>
        }
      </div>

      <div className={`${styles.sport} ${styles.water}`}>
        {/* <SportsWater/> */}
        {/* <SummerSportsInactive/> */}
        {/* <YearSportsInactive/> */}
        {
          yearSports
            ? <SummerSportsInactive/>
            : <YearSportsInactive/>
        }
      </div>
    </User>
  )
}

export default Index
