import User from "./User"
import styles from "../../css/about/Contact.module.css"
import Container from "../../components/templates/Container"
const Contact = () => {
  return (
    <User>
      <Container>
        <div className = {styles.contact}>
          <form>
            <div>
              <label htmlFor="#">Nombre:</label>
              <input type="text" />
            </div>

            <div>
              <label htmlFor="#">Correo Electronico:</label>
              <input type="text" />
            </div>

            <div>
              <label htmlFor="#">Asunto:</label>
              <input type="text" />
            </div>

            <div>
              <label htmlFor="#">Mensaje:</label>
              <textarea ></textarea>
            </div>
            
            <div><button>Enviar</button></div>

          </form>
        </div>
      </Container>
    </User>
  )
}

export default Contact
