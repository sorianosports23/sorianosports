import { BsXLg } from "react-icons/bs"
import styles from "../css/ImgVisualizer.module.css"
import assetsFolder from "../utils/publicfolder"

type TImgVisualizerProps = {
  img: string
  open: boolean
  close: () => void
}

const ImgVisualizer = ({ img, open, close }: TImgVisualizerProps) => {
  return (
    <div className={styles.visualizer} data-open={open}>
      <div className={styles.header}>
        <button onClick={close}><BsXLg/></button>
      </div>

      <div className={styles.img}>
        <img src={assetsFolder + "/img/index/" + img} alt="Visualizador imagen" />
      </div>
    </div>
  )
}

export default ImgVisualizer
