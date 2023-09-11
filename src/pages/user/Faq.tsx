import Container from "../../components/templates/Container"
import User from "./User"
import styles from "../../css/faq/Faq.module.css"
import { BsChevronRight, BsPlusCircle } from "react-icons/bs"
import Question from "../../components/faq/Question"

const Faq = () => {
  return (
    <User>
      <div className={styles.title}>
        <h1>Preguntas frecuentes</h1>
      </div>

      <Container>
        <div className={styles.questions}>
          <Question
            category="Categoria"
            question={[{question: "Pregunta 1", response: "Respuesta 1"}, {question: "Pregunta 2", response: "Respuesta 2"}]}
          />
        </div>
      </Container>
    </User>
  )
}

export default Faq