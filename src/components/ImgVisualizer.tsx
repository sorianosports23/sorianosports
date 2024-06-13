import { BsChevronLeft, BsChevronRight, BsXLg } from "react-icons/bs"
import styles from "../css/ImgVisualizer.module.css"
import assetsFolder from "../utils/publicfolder"
import { KeyboardEvent, useCallback, useEffect, useState } from "react"
import getImgsVisualizer from "../utils/getImagesVisualizer"

type TImgVisualizerProps = {
  img: string
  imgLink?: string
  open: boolean
  close: () => void
  hideButtons?: boolean
}

const imgs = getImgsVisualizer

const ImgVisualizer = ({ img, imgLink, open, close, hideButtons }: TImgVisualizerProps) => {

  const [imgName, setImgName] = useState(img)

  useEffect(() => {
    if (imgLink) return
    setImgName(img)
  }, [img, imgLink, open])

  const handleKey = (ev: KeyboardEvent<HTMLDivElement>) => {
    if (open && ev.key === "Escape") {
      close()
    }
  }

  const handlePrevImage = useCallback(() => {
    const currentIndex = imgs.findIndex(imgArr => imgArr === imgName)
    if (isNaN(currentIndex)) return
    if (!imgs[currentIndex-1]) {
      setImgName(imgs[imgs.length-1])
      return
    }

    setImgName(imgs[currentIndex-1])
  }, [img, imgs, imgName])

  const handleNextImage = useCallback(() => {
    const currentIndex = imgs.findIndex(imgArr => imgArr === imgName)
    if (isNaN(currentIndex)) return
    if (!imgs[currentIndex+1]) {
      setImgName(imgs[0])
      return
    }

    setImgName(imgs[currentIndex+1])
  }, [img, imgs, imgName])

  return (
    <div className={styles.visualizer} data-open={open} onKeyDown={handleKey} role="button" tabIndex={open ? 10 : -1}>
      <div className={styles.header}>
        <button onClick={close}><BsXLg/></button>
      </div>

      {
        !hideButtons
        && (
          <button onClick={() => handlePrevImage()} className={styles.btn}>
            <BsChevronLeft/>
          </button>
        )
      }
      <div className={styles.img}>
        {
          imgLink
          ?
          <img src={imgLink} alt="Visualizador imagen" />
          :
          <img src={assetsFolder + "/img/index/" + imgName} alt="Visualizador imagen" />
        }
      </div>
      {
        !hideButtons
        && (
          <button onClick={() => handleNextImage()} className={styles.btn}>
            <BsChevronRight/>
          </button>
        )
      }
    </div>
  )
}

export default ImgVisualizer
