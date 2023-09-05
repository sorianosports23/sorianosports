import Container from "../../components/templates/Container"
import User from "./User"
import styles from "../../css/faq/Faq.module.css"
import { BsChevronRight, BsPlusCircle } from "react-icons/bs"

const Faq = () => {
  return (
    <User>
      <div className={styles.title}>
        <h1>Preguntas frecuentes</h1>
      </div>

      <Container>
        <div className={styles.questions}>
          <div className={styles.question}>
            <div>
              <button>Categoria</button>
              <BsPlusCircle/>
            </div>

            <div>
              <p>¿Pregunta?</p>

              <div>
                <p>
                  <BsChevronRight/>
                  Respuesta
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </User>
  )
}

export default Faq