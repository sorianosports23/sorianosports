import CompHeader from "../../components/templates/CompHeader"
import styles from "../../css/index/index.module.css"
import CompCityCarrousel from "../../components/index/CompCityCarrousel"
import CompNewsCarrousel from "../../components/index/CompNewsCarrousel"
import CompSportsGround from "../../components/index/CompSportsGround"
import CompSportsWater from "../../components/index/CompSportsWater"
import CompFooter from "../../components/templates/CompFooter"

const PageIndex = () => {
  return (
    <>
    <CompHeader/>

    <main className={styles.main}>
      <div className={styles["city-carrousel"]}>
        <nav>
          <CompCityCarrousel/>
        </nav>
      </div>

      <div className={styles.news}>
        <CompNewsCarrousel/>
      </div>

      <div className={`${styles.sport} ${styles.ground}`}>
        <CompSportsGround/>
      </div>

      <div className={`${styles.sport} ${styles.water}`}>
        <CompSportsWater/>
      </div>
    </main>

    <CompFooter/>
    </>
  )
}

export default PageIndex
