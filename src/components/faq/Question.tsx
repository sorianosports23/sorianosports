import { BsChevronRight } from "react-icons/bs"
import styles from "../../css/faq/Faq.module.css"
import { useRef, useState, MutableRefObject, useEffect } from "react"

type TQuestionProps = {
  category: string
  question: { question: string, response: string }[]
}

const QResponse = ({question, response}: {question: string, response: string}) => {
  
  const [isOpen, setIsOpen] = useState(false)
  const [openHeight, setOpenHeight] = useState(0)
  const pText = useRef<HTMLParagraphElement>(null) as MutableRefObject<HTMLParagraphElement>
  
  const handleChangeHeight = () => {
    const cont = pText.current.getBoundingClientRect()
    setOpenHeight(cont.height)
  }

  useEffect(() => {
    const observer = new ResizeObserver(handleChangeHeight)
    if (pText.current) {
      observer.observe(pText.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className={styles.question_response}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <BsChevronRight
          style={{
            transform: `rotate(${isOpen ? 90 : 0}deg)`
          }}
        /> 
        { question }
      </button>

      <div
        className={styles.response_cont}
        style={
          {
            height: isOpen ? `calc(1rem + ${openHeight}px)` : "0",
            overflow: "hidden"
          }
        }
      >
        <p ref={pText}>
          { response }
        </p>
      </div>
    </div>
  )
}

const Question = ({ category, question }: TQuestionProps) => {

  const [questionOpen, setQuestionOpen] = useState(true)

  return (
    <div className={styles.question}
      style={{
        height: questionOpen ? "max-content" : "3rem"
      }}
    >
      <div>
        {/* <button className={styles.category_btn}
          onClick={() => setQuestionOpen(true)}
        >
          { category }
          {
            questionOpen 
              ? <BsDashCircle/>
              : <BsPlusCircle/>
          }
        </button> */}
      </div>

      {/* <div>
        <p>{ question }</p>

        <div>
          <p>
            <BsChevronRight/>
            { response }
          </p>
        </div>
      </div> */}
      {
        question.map((q, i) => (
          <QResponse
            question={q.question}
            response={q.response}
            key={i}
          />
        ))
      }
    </div>
  )  
}

export default Question
