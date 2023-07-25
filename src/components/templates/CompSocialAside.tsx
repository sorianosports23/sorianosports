import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs"

import styles from "../../css/aside/CompSocialAside.module.css"

const CompSocialAside = () => {
  return (
    <aside className={styles.aside}>
      <ul className={styles.ul}>
        <li><a href="##" className={styles.facebook}><BsFacebook/></a></li>
        <li><a href="##" className={styles.instagram}><BsInstagram/></a></li>
        <li><a href="##" className={styles.twitter}><BsTwitter/></a></li>
        <li><a href="##" className={styles.youtube}><BsYoutube/></a></li>
      </ul>
    </aside>
  )
}

export default CompSocialAside