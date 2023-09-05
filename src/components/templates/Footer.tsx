import { BsFillHouseFill, BsEnvelopeAtFill, BsTelephoneFill, BsClockFill, BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs"
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
            <a href="https://goo.gl/maps/NaShZAzvMVaJ51ue7" target="_blank" style={{textDecoration: "none"}}>Mercedes - Estadio Luis Köster</a>
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
            <a href="tel:45322201">
              4532 2201
            </a>
          </li>
          <li>
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
        by SorianoSports - UTU
      </div>
    </footer>
  )
}

export default Footer
