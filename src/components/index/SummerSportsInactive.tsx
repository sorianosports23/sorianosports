import { useState } from "react"
import styles from "../../css/index/SummerSportsInactive.module.css"
import assetsFolder from "../../utils/publicfolder"
import ImgVisualizer from "../ImgVisualizer"

const imgs = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"
]

const SummerSportsInactive = () => {

  const [visualizerImg, setVisualizerImg] = useState("")
  const [visualizerOpen, setVisualizerOpen] = useState(false)

  return (
    <div className={styles.summer}>
      <div className={styles.summer_main}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h2>
              {/* <span>Actividades</span>
              <span>Deportivas</span>
              <span>De verano</span> */}
              Actividades Deportivas de Verano
            </h2>
          </div>
          <div className={styles.carrousel}>
            {
              imgs.map((imgName, i) => (
                <button onClick={() => {
                  setVisualizerImg(imgName)
                  setVisualizerOpen(true)
                }}>
                  <img src={assetsFolder + "/img/index/" + imgName} alt="img" key={i} />
                </button>
              ))
            }
          </div>
        </div>


        <div className={styles.circle}>

        </div>
      </div>

      <ImgVisualizer img={visualizerImg} open={visualizerOpen} close={() => setVisualizerOpen(false)}/>
    </div>
  )
}

export default SummerSportsInactive
