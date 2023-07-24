import { BsFillHouseFill, BsEnvelopeAtFill, BsTelephoneFill, BsClockFill, BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs"
import styles from "../../css/footer/CompFooter.module.css"

const CompFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        <div className={styles["social-header"]}>
          <h3>Contacto:</h3>
          <div>
            <ul>
              <li>
                <a href="##"><BsFacebook className={styles.facebook}/></a>
              </li>
              <li>
                <a href="##"><BsInstagram className={styles.instagram}/></a>
              </li>
              <li>
                <a href="##"><BsTwitter className={styles.twitter}/></a>
              </li>
              <li>
                <a href="##"><BsYoutube className={styles.youtube}/></a>
              </li>
            </ul>
          </div>
        </div>
        <ul>
          <li>
            <div className={styles.icon}>
              <BsFillHouseFill/>
            </div>
              Mercedes - Soriano, Calle Falsa 123.
          </li>
          <li>
            <div className={styles.icon}>
              <BsEnvelopeAtFill/>
            </div>
            <a href="mailto:deportes@soriano.gub.uy">
              deportes@soriano.gub.uy
            </a>
          </li>
          <li>
            <div className={styles.icon}>
              <BsTelephoneFill/>
            </div>
            <a href="tel:59812345678">
              (+598) 1234 5678
            </a>
          </li>
          <li>
            <div className={styles.icon}>
              <BsClockFill/>
            </div>
            8:00 a 19:00
          </li>
        </ul>
      </div>
      <div className={styles.copyright}>
        Copyright © {new Date().getFullYear()} Intendencia de Soriano
      </div>
    </footer>
  )
}

export default CompFooter
