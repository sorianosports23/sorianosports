import PageUser from "../PageUser"
import styles from "../../../css/activities/sports/PageSports.module.css"
import CompContainer from "../../../components/templates/CompContainer"

const PageSports = () => {
  return (
    <PageUser>
      <CompContainer>
        <div className={styles.selector}>
          <div className={styles.ground}>
            <div className={styles.icon}>
              <img src={process.env.PUBLIC_URL + "/assets/img/icons/running.png"} alt="person-running" />
            </div>
            <p>
              Deportes terrestres
            </p>
          </div>
          <div className={styles.separator}>
            <img src={process.env.PUBLIC_URL + "/assets/img/secretaria_deportes.svg"} alt="deportes" />
          </div>
          <div className={styles.water}>
            <div className={styles.icon}>
              <img src={process.env.PUBLIC_URL + "/assets/img/icons/swimming.png"} alt="person-swimming" />
            </div>
            <p>
              Deportes acuaticos
            </p>
          </div>
        </div>

        <div className={styles.sports}>
          <div className={styles.sportCard}>
            <div className={styles.sportIcon}>
              <img src={process.env.PUBLIC_URL + "/assets/img/icons/basketball.png"} alt="basketball" />
            </div>
            <p>Basquetbol</p>
          </div>
        </div>
      </CompContainer>
    </PageUser>
  )
}

export default PageSports
