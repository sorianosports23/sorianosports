import { KeyboardEvent, useCallback, useEffect, useState } from "react"
import { BsXLg } from "react-icons/bs"
import styles from "../../css/admin/news/addNews.module.css"

type TPrevNewsProps = {
  text: string
  open: boolean
  close: () => void
  send: () => void
}

const PrevNews = ({ text, open, close, send }: TPrevNewsProps) => {
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
      if (line[0] === '' && line.length === 1) {
        return <br key={i}/>
      }
      else {
        return <p key={i}>{line}</p>
      }
    }

    useEffect(() => {
      if (text) {
        const textToShow = splitTextWithBr(text)
        console.log("show")
        console.log(textToShow)
        setNewsText(<>
          {
            textToShow.map((line, i) => setTextOrLineBreak(line, i))
          }
        </>)
      }
    }, [text, splitTextWithBr])

  const handleKeyboard = (ev: KeyboardEvent) => {
    if (open && ev.key === "Escape") {
      close()
    }
  }

  return (
    <div
      className={styles.modal_cont}
      data-open={open}
      onKeyDown={handleKeyboard}
      role="button"
      tabIndex={open ? 10 : -1}
    >
      <div 
        className={styles.modal} 
      >
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

          <div className={styles.modal_footer}>
            <button onClick={() => send()}>Subir noticia</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrevNews
