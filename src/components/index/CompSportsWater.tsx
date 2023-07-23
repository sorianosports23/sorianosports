import styles from "../../assets/css/index/sportswater.module.css"

const CompSportsWater = () => {
  return (
    <div className={styles.sportsmain}>
      <div className={styles.textDiv}>
        <div className={styles.img}>
          <img src={process.env.PUBLIC_URL + "/assets/img/sportswater.jfif"} alt="sports-ground" />
        </div>
        <div>
          <h2>
            <span>Deportes</span>
            <span>Actividades</span>
            <span>Acuaticas</span>
          </h2>
          <p>Recuerda hacer las cosas que disfrutas.</p>
        </div>
      </div>
      <div>
        <button>Abrir</button>
      </div>

      <div className={styles.circle}></div>
    </div>
  )  
}

export default CompSportsWater
