import { useEffect, useState } from "react"
import { BsXLg } from "react-icons/bs"
import styles from "../../css/admin/news/addNews.module.css"

type TPrevNewsProps = {
  text: string
  open: boolean
  close: () => void
}

const PrevNews = ({ text, open, close }: TPrevNewsProps) => {
  const [newsText, setNewsText] = useState(<></>)

  useEffect(() => {
    if (text) handleText(text)
  }, [text])

  const handleText = (newsText: string) => {

    const prevTextArr = newsText.split(/\{([^}]+)\}/)
    const textToShow = prevTextArr as string[] | JSX.Element[]
    console.log(textToShow)

    prevTextArr.map((text, i) => {
      if (text.includes("\n")) {
        textToShow[i] = <p>{text}</p>
      }

      if (text.includes("bold")) {
        let textBold = text.split('"')
        console.log(text)
        console.log(textBold)
        textToShow[i] = <span className="news_bold">{textBold[1]}</span>
      }
      if (text.includes("italic")) {
        let textItalic = text.split('"')
        textToShow[i] = <span className="news_italic">{textItalic[1]}</span>
      }
      if (text.includes("underline")) {
        let textUnderline = text.split('"')
        textToShow[i] = <span className="news_underline">{textUnderline[1]}</span>
      }
      return null
    })

    setNewsText(
      <p>
        {textToShow}
      </p>
    )
  }

  return (
    <div className={styles.modal} style={{transform: `translateY(${open ? "0" : "-150%"})`}}>
      <div>
        <div className={styles.modal_header}>
          Visualizador
          <button onClick={close}><BsXLg/></button>
        </div>

        <div className={styles.modal_body}>
          {
            newsText
          }
        </div>
      </div>
    </div>
  )
}

export default PrevNews
