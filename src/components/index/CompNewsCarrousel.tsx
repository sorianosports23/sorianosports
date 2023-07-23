import { useState, useRef, useEffect, MutableRefObject } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import styles from "../../assets/css/index/newscarrousel.module.css"

const CompNewsCarrousel = () => {

  const carrousel = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>
  const news = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>
  const [actualSlide, setActualSlide] = useState(1)
  const [newsTransition, setNewsTransition] = useState(true)
  const [numberOfSlides, setNumberOfSlides] = useState(0)
  const [onTransition, setOnTransition] = useState(false)

  useEffect(() => {
    carrousel.current.style.backgroundImage = `url(${process.env.PUBLIC_URL}/assets/img/news/n1.jpg)`
  }, [])

  const handleTransitionEnd = () => {
    console.log("end")
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
    const firstChild = news.current.firstChild as HTMLDivElement
    const lastChild = news.current.lastChild as HTMLDivElement
    console.log(firstChild)
    console.log(lastChild)
    const clonLastChild = document.createElement("div")
    clonLastChild.innerHTML = lastChild.innerHTML
    news.current.insertBefore(clonLastChild, firstChild)
    const clonFirstChild = document.createElement("div")
    clonFirstChild.innerHTML = firstChild.innerHTML
    news.current.appendChild(clonFirstChild)

    setNumberOfSlides(news.current.children.length)
    const currentNews = news.current
    
    return () => {
      currentNews.removeChild(clonFirstChild)
      currentNews.removeChild(clonLastChild)
    }
  }, [])

  return (
    <div className={styles.carrousel} ref={carrousel}>
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
        <div>
          <h2>Noticia 1</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum et quos itaque quis harum est vitae expedita nostrum, sint facilis dolorem ullam officia, maxime quas. Explicabo impedit voluptatem perferendis dolorem.
          </p>
          <button>Leer mas</button>
        </div>
        <div>
          <h2>Noticia 2</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque incidunt aut corrupti quibusdam quam eveniet enim culpa, ratione, cumque soluta voluptatum perspiciatis minima nesciunt corporis fugit consectetur ad rerum iure.
          </p>
          <button>Leer mas</button>
        </div>
        <div>
          <h2>Noticia 3</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet tenetur laudantium voluptas ex quae sunt, dolore temporibus unde rerum! Sequi qui nobis voluptatibus deserunt, quidem corrupti molestias deleniti sapiente nulla!
          </p>
          <button>Leer mas</button>
        </div>
      </div>
      <div className={styles["arrow-right"]}>
        <button onClick={() => handleChangeSlide("next")} disabled={onTransition}>
          <BsChevronRight/>
        </button>
      </div>
    </div>
  )
}

export default CompNewsCarrousel