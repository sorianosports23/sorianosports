import styles from "../../../css/session/account/Inscriptions.module.css"

const IncriptionRecord = ({ sport, signedUp, dateStart, dateEnd, teacher, place }: TInscriptionRecord) => {
  return (
    <li className={styles.inscription}>
      <div>
        <p>Deporte</p>
        <span>{sport}</span>
      </div>

      <div>
        <p>
          <div data-signedup={signedUp}/>
          {
            signedUp
              ? "Inscrito"
              : "Dado de baja"
          }
        </p>
        <span>
          {
            signedUp && <button>Dar de baja</button>
          }
        </span>
      </div>

      <div>
        <p>Fecha de inscripción</p>
        <span>
          {dateStart}
          {dateEnd && ` - ${dateEnd}`}
        </span>
      </div>

      <div>
        <p>Profesor</p>
        <span>{teacher}</span>
      </div>

      <div>
        <p>Lugar</p>
        <span>{place}</span>
      </div>
    </li>
  )
}

const Inscriptions = () => {
  return (
    <div>
      <ul className={styles.inscription_ul}>
        <IncriptionRecord
          sport="Futbol"
          signedUp={true}
          dateStart="27/09/23"
          teacher="Prof X"
          place="CRM"
        />

        <IncriptionRecord
          sport="Basquetbol"
          signedUp={false}
          dateStart="27/09/23"
          dateEnd="29/10/23"
          teacher="Prof X"
          place="CRM"
        />
      </ul>
    </div>
  )
}

export default Inscriptions