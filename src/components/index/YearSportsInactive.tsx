import { MutableRefObject, useEffect, useRef, useState } from "react"
import styles from "../../css/index/SummerSportsInactive.module.css"
import assetsFolder from "../../utils/publicfolder"
import ImgVisualizer from "../ImgVisualizer"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

const imgs = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"
]

const YearSportsInactive = () => {

  const [visualizerImg, setVisualizerImg] = useState("")
  const [visualizerOpen, setVisualizerOpen] = useState(false)
  const [carrouselTransform, setCarrouselTransform] = useState(0)

  const content = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>
  const carrousel = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>

  const [carrouselWidth, setCarrouselWidth] = useState(0)
  const [imagesOnCarrousel, setImagesOnCarrousel] = useState(0)

  const handleCarrouselLeft = () => {
    if (carrouselTransform >= 0) return
    setCarrouselTransform(prev => prev + 18)
  }

  useEffect(() => {
    console.log(carrouselTransform)
  }, [carrouselTransform])

  const handleCarrouselRight = () => {
    if (imagesOnCarrousel === 1) {
      if ((carrouselTransform * 16)
      <=
      (((carrousel.current.getBoundingClientRect().width - carrouselWidth)) * -1)) return
    } else {
      if ((carrouselTransform * 16)
      <=
      (((carrousel.current.getBoundingClientRect().width - carrouselWidth) - 18*16) * -1)) return
    }
    setCarrouselTransform(prev => prev - 18)
  }

  useEffect(() => {
    if (content.current && carrousel.current) {
      const carrouselSize = content.current.getBoundingClientRect()
      setCarrouselWidth(carrouselSize.width)
      setImagesOnCarrousel(Math.round(carrouselSize.width / 288))

    }
  }, [imagesOnCarrousel])

  return (
    <div className={styles.summer}>
      <div className={styles.summer_main}>
        <div className={styles.content} ref={content}>
          <div className={styles.title}>
            <h2>
              Actividades Anuales
            </h2>
          </div>
          <div className={styles.carrousel_btns}>
              <button
                onClick={() => handleCarrouselLeft()}
              >
                <BsChevronLeft/>
              </button>

              <button
                onClick={() => handleCarrouselRight()}
              >
                <BsChevronRight/>
              </button>
            </div>
          <div className={styles.carrousel}
            style={{
              transform: `translateX(${carrouselTransform}rem)`
            }}
            ref={carrousel}
          >
            {
              imgs.map((imgName, i) => (
                <button onClick={() => {
                  setVisualizerImg(imgName)
                  setVisualizerOpen(true)
                }}
                  key={i}
                >
                  <img src={assetsFolder + "/img/index/" + imgName} alt="img" />
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

export default YearSportsInactive
