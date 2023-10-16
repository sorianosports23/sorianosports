import { useLoaderData, useParams } from "react-router-dom"
import User from "./User"
import { useCallback, useEffect, useState } from "react"
import { BsPersonFill } from "react-icons/bs"
import styles from "../../css/news/ReadNews.module.css"
import Container from "../../components/templates/Container"
import api from "../../api/apiRoute"

const ReadNews = () => {
  
  const newsParams = useParams()
  const loaderData = useLoaderData() as INews

  useEffect(() => {
    console.log(loaderData)
  }, [loaderData])

  const [newsText, setNewsText] = useState(<></>)

  const processText = (textToProcess: string) => textToProcess.split(/\{([^}]+)\}/).map((subText, i) => {
    console.log(`PROCESANDO ${textToProcess} SUB TXT ${subText}`)
    if (subText.includes("bold")) {
      const textInBold = subText.split('"')
      console.log(`BOLD ${textInBold}`)
      return <span className="news_bold">{textInBold[1]}</span>
    }

    if (subText.includes("italic")) {
      const textInBold = subText.split('"')
      console.log(`ITALIC ${textInBold}`)
      return <span className="news_italic">{textInBold[1]}</span>
    }

    if (subText.includes("underline")) {
      const textInBold = subText.split('"')
      console.log(`UNDERLINE ${textInBold}`)
      return <span className="news_underline">{textInBold[1]}</span>
    }
    
    return subText
  })

  const splitTextWithBr = useCallback((text: string) => {
    return text.split("\n").map((line) => processText(line))
  }, [])

  const setTextOrLineBreak = (line: (string | JSX.Element)[], i: number) => {
    if (line[0] === '\r' && line.length === 1) {
      return <br key={i}/>
    }
    else if (line[0] === '' && line.length === 1) {
      return <br key={i}/>
    }
    else {
      return <p key={i}>{line}</p>
    }
  }

  useEffect(() => {
    if (loaderData.note) {
      const textToShow = splitTextWithBr(loaderData.note)
      console.log("show")
      console.log(textToShow)
      setNewsText(<>
        {
          textToShow.map((line, i) => setTextOrLineBreak(line, i))
        }
      </>)
    }
  }, [loaderData, splitTextWithBr])
  
  return (
    <User>
      <Container>
        <div className={styles.news_cont}>
          <div className={styles.news_img}>
            <img src={api + loaderData.image} alt={`Imagén de noticia ${newsParams.id}`} />
          </div>
          <div className={styles.info}>
            <h1>{loaderData.name}</h1>
            <span>
              <BsPersonFill/>
              {loaderData.author}, {loaderData.date}
            </span>
          </div>
          <div className={styles.note}>
            {
              newsText
            }
          </div>
        </div>
      </Container>
    </User>
  )
}

export default ReadNews
