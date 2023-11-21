import styles from "../../../css/session/account/Inbox.module.css"

const Inbox = () =>{
  return(
    <>
    <div className={styles.inbox_table}>
      <ul>

        <li>
          <div className={styles.card}>
            <div>
              <p>Asunto</p>
              <span>Problema de Backend</span>
            </div>

            <div>
              <p>Estado</p>
              <span className={styles.status_span}>
                <div className={styles.color_status}>

                </div>
                Pendiente
              </span>
            </div>

            <button className={styles.btn_show}>Ver Mensaje</button>
          </div>
        </li>

       
      </ul>
    </div>
    </>
  )
}

export default Inbox;