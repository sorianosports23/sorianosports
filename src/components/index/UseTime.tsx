import styles from "../../css/index/GreatEvents.module.css"

const UseTime = () => {
  return (
    <div className={styles.time}>
      <div>
        <p>02</p>
        <span>Dias</span>
      </div>
      
      <div>
        <p>05</p>
        <span>Horas</span>
      </div>

      <div>
        <p>12</p>
        <span>Minutos</span>
      </div>
    </div>
  )
}

export default UseTime