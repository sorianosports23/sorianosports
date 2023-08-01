import CompEvent from "../../components/events/CompEvent"
import CompHeader from "../../components/templates/CompHeader"
import styles from "../../css/events/main.module.css"
import { BsFillCaretDownFill, BsFillCalendarDateFill } from "react-icons/bs"

const PageEvents = () => {
  return (
    <>
    <CompHeader/>

    <main>
      <div className={styles.programation}>
        <div className={styles.title}>
          <h1>Programación</h1>

          <div>
            <div>
              <button>Localidades <BsFillCaretDownFill/></button>
              <p>Mercedes</p>
            </div>

            <button>Fecha <BsFillCalendarDateFill/></button>
          </div>
        </div>

        <div className={styles.events}>
          <CompEvent
            dayNumber={8}
            day={"SAB"}
            hour={"12:00 H"}
            sportName="REMO"
            place="Club Remeros Mercedes"
          />
        </div>
        
      </div>
    </main>
    </>
  )
}

export default PageEvents
