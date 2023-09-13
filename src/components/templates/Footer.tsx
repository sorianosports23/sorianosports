import { BsFillHouseFill, BsEnvelopeAtFill, BsTelephoneFill, BsClockFill, BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs"
import { FaXTwitter } from "react-icons/fa6"
import styles from "../../css/footer/Footer.module.css"
import assetsFolder from "../../utils/publicfolder"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        <div className={styles["social-header"]}>
          <h3>Contacto:</h3>
          <div>
            <ul>
              <li>
                <a href="https://www.facebook.com/intendenciasoriano" title="Facebook"><BsFacebook className={styles.facebook}/></a>
              </li>
              <li>
                <a href="https://www.instagram.com/deportes.soriano" title="Instagram"><BsInstagram className={styles.instagram}/></a>
              </li>
              <li>
                <a href="https://twitter.com/Sorianofertil" title="X (Twitter)"><FaXTwitter className={styles.twitter}/></a>
              </li>
              <li>
                <a href="https://www.youtube.com/@sorianotv3939" title="Youtube"><BsYoutube className={styles.youtube}/></a>
              </li>
            </ul>
          </div>
        </div>
        <ul>
          <li>
            <div className={styles.icon}>
              <BsFillHouseFill/>
            </div>
            <a href="https://goo.gl/maps/NaShZAzvMVaJ51ue7" target="_blank" style={{textDecoration: "none"}} rel="noreferrer" title="Ubicación de la Secretaria de Deportes">Mercedes - Estadio Luis Köster</a>
          </li>
          <li>
            <div className={styles.icon}>
              <BsEnvelopeAtFill/>
            </div>
            <a href="mailto:deportes@soriano.gub.uy" title="Correo de la Secretaria de Deportes">
              deportes@soriano.gub.uy
            </a>
          </li>
          <li>
            <div className={styles.icon}>
              <BsTelephoneFill/>
            </div>
            <a href="tel:45322201" title="Teléfono de la Secretaria de Deportes">
              4532 2201
            </a>
          </li>
          <li title="Horario abierto de la Secretaria de Deportes">
            <div className={styles.icon}>
              <BsClockFill/>
            </div>
            8:00 a 14:00
          </li>
        </ul>
      </div>

      <div className={styles.share}>
        <div>
          <h4>Comparte la pagina</h4>
          <div>
            <img src={assetsFolder + "/img/qr.png"} alt="qr" id="qr-photo"/>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        Copyright © {new Date().getFullYear()} <a href="https://soriano.gub.uy" style={{textDecoration: "none", color: "#222"}}>Intendencia de Soriano</a>
        <br />
        by SorianoSports - UTU 2023
      </div>
    </footer>
  )
}

export default Footer
