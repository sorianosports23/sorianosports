import { useState, useRef, useEffect, MutableRefObject, useCallback } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import styles from "../../css/index/newscarrousel.module.css"
import { Link } from "react-router-dom"
import Loading from "../../pages/Loading"
import apiGetRecentNews from "../../api/page/getRecentNews"
import api from "../../api/apiRoute"

const NewsSlide = ({id, name, description, image}: TNews) => {
  return (
    <div style={{backgroundImage: `url(${api}${image})`}}>
      <h2>{name}</h2>
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

  const [recentNews, setRecentsNews] = useState<Array<TNews>>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (recentNews.length === 0) return
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

  const handleChangeSlide = useCallback((page: "prev" | "next") => {
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
  }, [numberOfSlides])

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

  const getRecentNews = async () => {
    const recentNewsApi = await apiGetRecentNews()
    console.log(recentNewsApi)
    if (recentNewsApi.status) {
      setRecentsNews(recentNewsApi.data)
      setLoading(false)
    }
  }

  useEffect(() => {
    getRecentNews()
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

  if (loading) {
    return <Loading/>
  }

  return (
    <div className={styles.carrousel} ref={carrousel } tabIndex={-1}
      onPointerEnter={() => setMouseOnNews(true)}
      onPointerLeave={() => setMouseOnNews(false)}
    >
      <div className={styles["arrow-left"]}>
        <button onClick={() => handleChangeSlide("prev")} disabled={onTransition} tabIndex={-1}> 
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
          recentNews.length === 3 && <NewsSlide {...recentNews[2]}/>
        }
        {
          recentNews.length === 2 && <NewsSlide {...recentNews[1]}/>
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
        <button onClick={() => handleChangeSlide("next")} disabled={onTransition} tabIndex={-1}> 
          <BsChevronRight/>
        </button>
      </div>

      <div className={styles.arrows_mobile}>
        <button onClick={() => handleChangeSlide("prev")} tabIndex={-1}>
          <BsChevronLeft/>
        </button>
        <button onClick={() => handleChangeSlide("next")} tabIndex={-1}>
          <BsChevronRight/>
        </button>
      </div>
    </div>
  )
}

export default NewsCarrousel