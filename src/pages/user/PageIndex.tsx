import CompHeader from "../../components/templates/CompHeader"
import styles from "../../assets/css/index/index.module.css"
import CompCityCarrousel from "../../components/index/CompCityCarrousel"
import CompNewsCarrousel from "../../components/index/CompNewsCarrousel"

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

      </div>

      <div className={`${styles.sport} ${styles.water}`}>

      </div>
    </main>
    </>
  )
}

export default PageIndex
