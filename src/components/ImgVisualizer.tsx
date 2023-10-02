import { BsXLg } from "react-icons/bs"
import styles from "../css/ImgVisualizer.module.css"
import assetsFolder from "../utils/publicfolder"
import { KeyboardEvent } from "react"

type TImgVisualizerProps = {
  img: string
  open: boolean
  close: () => void
}

const ImgVisualizer = ({ img, open, close }: TImgVisualizerProps) => {

  const handleKey = (ev: KeyboardEvent<HTMLDivElement>) => {
    if (open && ev.key === "Escape") {
      close()
    }
  }

  return (
    <div className={styles.visualizer} data-open={open} onKeyDown={handleKey} role="button" tabIndex={open ? 10 : -1}>
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
