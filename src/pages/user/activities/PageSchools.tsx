import assetsFolder from "../../../utils/publicfolder"
import PageUser from "../PageUser"
import styles from "../../../css/activities/schools/PageSchools.module.css"
import CompSchool from "../../../components/activities/schools/CompSchool"
import CompContainer from "../../../components/templates/CompContainer"

const PageSchools = () => {
  return (
    <PageUser>
      <CompContainer>
        <div className={styles.schools_type}>
          <div className={styles.summer}>
            <img src={assetsFolder + "/img/icons/school1.png"} alt="school-summer" />
            <p>
              Verano
            </p>

            {/* <div className={styles.inside}></div> */}
          </div>

          <div className={styles.separator}>
            <img src={assetsFolder + "/img/secretaria_deportes.svg"} alt="separator" />
          </div>

          <div className={styles.year}>
            <img src={assetsFolder + "/img/icons/school2.png"} alt="school-year" />
            <p>
              Anuales
            </p>

            {/* <div className={styles.inside}></div> */}
          </div>
        </div>

        <div className={styles.schools_cont}>
          <CompSchool name="Escuela X"/>
          <CompSchool name="Escuela X"/>
          <CompSchool name="Escuela X"/>
          <CompSchool name="Escuela X"/>
          <CompSchool name="Escuela X"/>
          <CompSchool name="Escuela X"/>
          <CompSchool name="Escuela X"/>
          <CompSchool name="Escuela X"/>
          <CompSchool name="Escuela X"/>
          <CompSchool name="Escuela X"/>
        </div>
      </CompContainer>
    </PageUser>
  )
}

export default PageSchools
