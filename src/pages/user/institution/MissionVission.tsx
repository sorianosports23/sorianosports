import Container from "../../../components/templates/Container"
import assetsFolder from "../../../utils/publicfolder"
import User from "../User"
import borderStyles from "../../../css/institution/missionvission/TitleBorder.module.css"
import bgStyles from "../../../css/institution/missionvission/Background.module.css"
import styles from "../../../css/institution/missionvission/MissionVission.module.css"

const TitleBorder = ({up}: {up:boolean}) => {
  return (
    <div className={borderStyles.border_cont} data-pos={up ? "up" : "bottom"}>
      <div className={borderStyles.border_line}></div>
      <div className={borderStyles.poly}></div>
      <div className={borderStyles.poly}></div>
      <div className={borderStyles.poly}></div>
      <div className={borderStyles.border_line}></div>
    </div>
  )
}

const Background = () => {

  return (
    <>
    <div className={bgStyles.bg} style={{backgroundImage: `url(${assetsFolder}/img/mvbg.png)`}}>

    </div>
    </>
  )
}

const MissionVission = () => {
  return (
    <User pageTitle="Mision y Vision">
      <div className={styles.mv_cont}>
        <Container>
          <div className={styles.title}>
            <TitleBorder up={true}/>
            <div className={styles.title_h1}>
              <h1>Misión y Visión</h1>
            </div>
            <TitleBorder up={false}/>
          </div>

          <div className={styles.cont}>
            <div className={styles.content}>
              <div className={styles.icon}>
                <img src={assetsFolder + "/img/icons/mission.png"} alt="mission-icon" />
              </div>
              <div className={styles.content_text}>
                <h2>Misión</h2>
                <p>
                  Alcanzar cada rincón del departamento, promoviendo la actividad física, desde la temprana edad, con programas adaptados a cada localidad.
                  <br />
                  Ser una institución que genere y promueve hábitos de vida saludable y valores, a tráves del deporte, garantizando calidad de vida y accesibilidad.
                </p>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.icon}>
                <img src={assetsFolder + "/img/icons/vission.png"} alt="vission-icon" />
              </div>
              <div className={styles.content_text}>
                <h2>Visión</h2>
                <p>
                  Somos la Secretaria de Deportes de la intendencia de Soriano.
                  <br />
                  Nustra principal tarea es implementar políticas públicas deportivas, estimulando la participación activa de la población.
                </p>
              </div>
            </div>
          </div>
        </Container>

        <Background/>
      </div>
    </User>
  )
}

export default MissionVission
