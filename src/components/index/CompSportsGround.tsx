import styles from "../../assets/css/index/sportsground.module.css"

const CompSportsGround = () => {
  return (
    <div className={styles.sportsmain}>
      <div className={styles.textDiv}>
        <div>
          <h2>
            <span>Deportes</span>
            <span>Actividades</span>
            <span>En tierra</span>
          </h2>
          <p>Simplemente juega. Diviértete. Disfruta el juego.</p>
        </div>
        <div className={styles.img}>
          <img src={process.env.PUBLIC_URL + "/assets/img/sportsground.jpg"} alt="sports-ground" />
        </div>
      </div>
      <div>
        <button>Abrir</button>
      </div>

      <div className={styles.circle}></div>
    </div>
  )
}

export default CompSportsGround
