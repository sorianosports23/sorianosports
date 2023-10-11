import { useState, useRef, useEffect, MutableRefObject } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import styles from "../../css/index/newscarrousel.module.css"
import assetsFolder from "../../utils/publicfolder"
import newsDemo from "../../utils/demo/news"
import { TNewsCardProps } from "../news/NewsCard"
import { Link } from "react-router-dom"

const NewsSlide = ({id, title, description, img}: TNewsCardProps) => {
  return (
    <div style={{backgroundImage: `url(${img})`}}>
      <h2>{title}</h2>
      <p>
        {description}
      </p>
      <Link to={`/noticias/leer/${id}`}>Leer más</Link>
    </div>
  )
}

const NewsCarrousel = () => {

  const carrousel = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>
  const news = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>
  const [actualSlide, setActualSlide] = useState(1)
  const [newsTransition, setNewsTransition] = useState(true)
  const [numberOfSlides, setNumberOfSlides] = useState(0)
  const [onTransition, setOnTransition] = useState(false)
  const [mouseOnNews, setMouseOnNews] = useState(false)

  const [recentNews, setRecentsNews] = useState<Array<TNewsCardProps>>([])

  useEffect(() => {
    if (recentNews.length === 0) return
    // carrousel.current.style.backgroundImage = `url(${recentNews[actualSlide-1].img})`
  }, [recentNews, actualSlide])

  const handleTransitionEnd = () => {
    setOnTransition(false)
  }

  useEffect(() => {
    if (!newsTransition) {
      setNewsTransition(true)
      setOnTransition(false)
    }
  }, [actualSlide, newsTransition, onTransition])

  const handleChangeSlide = (page: "prev" | "next") => {
    if (page === "next") {
      setOnTransition(true)
      setActualSlide(prev => {
        if (prev === numberOfSlides-1) {
          setNewsTransition(false)
          return 1
        }
        return prev+1
      })
    } else if (page === "prev") {
      setOnTransition(true)
      setActualSlide(prev => {
        if (prev === 0) {
          setNewsTransition(false)
          return numberOfSlides-2
        }

        return prev-1
      })
    }
  }

  useEffect(() => {   
    if (recentNews.length === 0) return
    // const firstChild = news.current.firstChild as HTMLDivElement
    // const lastChild = news.current.lastChild as HTMLDivElement
    // const clonLastChild = document.createElement("div")
    // clonLastChild.innerHTML = lastChild.innerHTML
    // news.current.insertBefore(clonLastChild, firstChild)
    // const clonFirstChild = document.createElement("div")
    // clonFirstChild.innerHTML = firstChild.innerHTML
    // news.current.appendChild(clonFirstChild)

    setNumberOfSlides(news.current.children.length)
    // const currentNews = news.current
    
    return () => {
      // currentNews.removeChild(clonFirstChild)
      // currentNews.removeChild(clonLastChild)
    }
  }, [recentNews])

  useEffect(() => {
    setRecentsNews([
      {...newsDemo[9]},
      {...newsDemo[8]},
      {...newsDemo[7]}
    ])
  }, [])

  useEffect(() => {
    const intervalSlide = setInterval(() => {
      if (mouseOnNews) return
      handleChangeSlide("next")
    }, 3000)

    return () => {
      clearInterval(intervalSlide)
    }
  }, [handleChangeSlide, mouseOnNews])

  return (
    <div className={styles.carrousel} ref={carrousel}
      onPointerEnter={() => setMouseOnNews(true)}
      onPointerLeave={() => setMouseOnNews(false)}
    >
      <div className={styles["arrow-left"]}>
        <button onClick={() => handleChangeSlide("prev")} disabled={onTransition}>
          <BsChevronLeft/>
        </button>
      </div>
      <div 
        className={styles.news} 
        ref={news}
        style={{
          transform: `translateX(-${100 * actualSlide}%)`,
          transition: newsTransition ? "transform .3s" : "unset"
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {
          recentNews.length !== 0 && <NewsSlide {...recentNews[2]}/>
        }
        {
          recentNews.map((news, i) => (
            <NewsSlide {...news} key={i}/>
          ))
        }
        {
          recentNews.length !== 0 && <NewsSlide {...recentNews[0]}/>
        }   
      </div>
      <div className={styles["arrow-right"]}>
        <button onClick={() => handleChangeSlide("next")} disabled={onTransition}>
          <BsChevronRight/>
        </button>
      </div>

      <div className={styles.arrows_mobile}>
        <button onClick={() => handleChangeSlide("prev")}>
          <BsChevronLeft/>
        </button>
        <button onClick={() => handleChangeSlide("next")}>
          <BsChevronRight/>
        </button>
      </div>
    </div>
  )
}

export default NewsCarrousel