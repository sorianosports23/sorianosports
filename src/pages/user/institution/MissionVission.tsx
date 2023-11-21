import Container from "../../../components/templates/Container"
import assetsFolder from "../../../utils/publicfolder"
import User from "../User"
import borderStyles from "../../../css/institution/missionvission/TitleBorder.module.css"
import bgStyles from "../../../css/institution/missionvission/Background.module.css"
import styles from "../../../css/institution/missionvission/MissionVission.module.css"
import { useEffect, useRef } from "react"

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

  // const parent = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   if (parent.current) {
  //     const observer = new ResizeObserver(sizeChange)
  //     observer.observe(parent.current)
  //   }
  // }, [parent])

  // const sizeChange = () => {
  //   if (parent.current) {
  //     const parentSize = parent.current.getBoundingClientRect()
  //     const childs = Array.from(parent.current.children as HTMLCollectionOf<HTMLElement>)
  //     childs.map((child) => {
  //       const childSize = child.getBoundingClientRect()
  //       const bgSize = {
  //         x: parentSize.width,
  //         y: parentSize.height
  //       }
  //       child.style.backgroundSize = `${bgSize.x}px ${bgSize.y}px`
  //       const offsetX = childSize.width - childSize.right
  //       const offsetY = (childSize.height - childSize.top) + 26.9
  //       child.style.backgroundPosition = `${offsetX}px ${offsetY}px`
      
  //       return null
  //     })
  //   }
  // }

  return (
    <>
    <div className={bgStyles.bg} style={{backgroundImage: `url(${assetsFolder}/img/mvbg.png)`}}>
      {/* <div className={bgStyles.white_bg}></div> */}
      {/* <div className={bgStyles.miniPoly} style={{backgroundImage: `url(${assetsFolder}/img/missionvissionbg.jpg)`}}></div>
      <div className={bgStyles.miniPoly} style={{backgroundImage: `url(${assetsFolder}/img/missionvissionbg.jpg)`}}></div>
      <div className={bgStyles.miniPoly} style={{backgroundImage: `url(${assetsFolder}/img/missionvissionbg.jpg)`}}></div>
      <div className={bgStyles.bigPoly} style={{backgroundImage: `url(${assetsFolder}/img/missionvissionbg.jpg)`}}></div> */}
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
            <div>
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
