import assetsFolder from "../../../utils/publicfolder"
import User from "../User"
import styles from "../../../css/activities/schools/Schools.module.css"
import School from "../../../components/activities/schools/School"
import Container from "../../../components/templates/Container"

const Schools = () => {
  return (
    <User>
      <Container>
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
          <School name="Escuela X"/>
          <School name="Escuela X"/>
          <School name="Escuela X"/>
          <School name="Escuela X"/>
          <School name="Escuela X"/>
          <School name="Escuela X"/>
          <School name="Escuela X"/>
          <School name="Escuela X"/>
          <School name="Escuela X"/>
          <School name="Escuela X"/>
        </div>
      </Container>
    </User>
  )
}

export default Schools
