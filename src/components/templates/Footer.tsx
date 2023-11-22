import { BsFillHouseFill, BsEnvelopeAtFill, BsTelephoneFill, BsClockFill, BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs"
import { FaXTwitter } from "react-icons/fa6"
import styles from "../../css/footer/Footer.module.css"
import assetsFolder from "../../utils/publicfolder"
import { useContext, useState } from "react"
import { socialMediaContext } from "../../context/social/SocialMediaContext"

const Footer = () => {

  const { socialMedia } = useContext(socialMediaContext)

  const [shareOpen, setShareOpen] = useState(false)

  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        <div className={styles["social-header"]}>
          <h3>Contacto:</h3>
          <div>
            <ul>
              <li>
                <a href={socialMedia.Facebook} title="Facebook"><BsFacebook className={styles.facebook}/></a>
              </li>
              <li>
                <a href={socialMedia.Instagram} title="Instagram"><BsInstagram className={styles.instagram}/></a>
              </li>
              <li>
                <a href={socialMedia.Twitter} title="X (Twitter)"><FaXTwitter className={styles.twitter}/></a>
              </li>
              <li>
                <a href={socialMedia.Youtube} title="Youtube"><BsYoutube className={styles.youtube}/></a>
              </li>
            </ul>
          </div>
        </div>
        <ul>
          <li>
            <div className={styles.icon}>
              <BsFillHouseFill/>
            </div>
            <a href="https://goo.gl/maps/NaShZAzvMVaJ51ue7" target="_blank" style={{textDecoration: "none"}} rel="noreferrer" title="Ubicación de la Secretaria de Deportes">{socialMedia.Direccion}</a>
          </li>
          <li>
            <div className={styles.icon}>
              <BsEnvelopeAtFill/>
            </div>
            <a href={`mailto:${socialMedia.Correo}`} title="Correo de la Secretaria de Deportes">
              {socialMedia.Correo}
            </a>
          </li>
          <li>
            <div className={styles.icon}>
              <BsTelephoneFill/>
            </div>
            {socialMedia.Telefono}
          </li>
          <li title="Horario abierto de la Secretaria de Deportes">
            <div className={styles.icon}>
              <BsClockFill/>
            </div>
            {socialMedia.Horario}
          </li>
        </ul>
      </div>

      <div className={styles.share}>
        <div>
          <button
            onClick={() => setShareOpen(prev => !prev)}
            className={styles.btn}
          >
            Comparte la pagina
          </button>
          <div
            style={{
              display: shareOpen ? "flex" : "none"
            }}
          >
            <img src={assetsFolder + "/img/qr.png"} alt="qr" id="qr-photo"/>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        Copyright © {new Date().getFullYear()} <a href="https://soriano.gub.uy" style={{textDecoration: "none", color: "#222"}}>Intendencia de Soriano</a>
        <br />
        by <a href="https://www.instagram.com/soriano_sports_/" style={{textDecoration: "none", color: "#222"}}>Soriano Sports</a>  - UTU 2023
      </div>
    </footer>
  )
}

export default Footer
