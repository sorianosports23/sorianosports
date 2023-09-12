import styles from "../../css/index/SummerSportsInactive.module.css"
import assetsFolder from "../../utils/publicfolder"

const imgs = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"
]

const SummerSportsInactive = () => {
  return (
    <div className={styles.summer}>
      <div className={styles.summer_main}>
        <div className={styles.content}>
          <div className={styles.carrousel}>
            {
              imgs.map((imgName, i) => (
                <div>
                  <img src={assetsFolder + "/img/index/" + imgName} alt="img" key={i} />
                </div>
              ))
            }
          </div>
        </div>

        <div className={styles.title}>
          <h2>
            <span>Actividades</span>
            <span>Deportivas</span>
            <span>De verano</span>
          </h2>
        </div>

        <div className={styles.circle}>

        </div>
      </div>
    </div>
  )
}

export default SummerSportsInactive
