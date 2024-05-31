import styles from "../../css/index/index.module.css"
import NewsCarrousel from "../../components/index/NewsCarrousel"
import YearSports from "../../components/index/YearSports"
import User from "./User"
import SummerSportsInactive from "../../components/index/SummerSportsInactive"
import YearSportsInactive from "../../components/index/YearSportsInactive"
import SummerSports from "../../components/index/SummerSports"
import { useEffect, useState } from "react"
import GreatEvents from "../../components/index/GreatEvents"

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
    console.log(yearSports)
  }, [yearSports])

  useEffect(() => {
    checkDayForActivities()
  })

  return (    
    <User pageTitle="Deportes y Recreacion">
      <div className={styles.news}>
        <NewsCarrousel/>
      </div>

      <div className={`${styles.sport} ${styles.ground}`}>
        {
          yearSports 
            ? <YearSports/>
            : <SummerSports/>
        }
      </div>

      <div className={`${styles.sport} ${styles.water}`}>
        {
          !yearSports
            ? <SummerSportsInactive/>
            : <YearSportsInactive/>
        }
      </div>

      <div>
        <GreatEvents/>
      </div>
    </User>
  )
}

export default Index
