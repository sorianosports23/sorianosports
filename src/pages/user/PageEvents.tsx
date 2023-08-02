import { useState } from "react"
import CompEvent from "../../components/events/CompEvent"
import CompHeader from "../../components/templates/CompHeader"
import styles from "../../css/events/main.module.css"
import { BsFillCaretDownFill, BsFillCalendarDateFill , BsFillCaretUpFill} from "react-icons/bs"

const PageEvents = () => {

  const [showPlaces, setShowPlaces] = useState(false)

  return (
    <>
    <CompHeader/>

    <main>
      <div className={styles.programation}>
        <div className={styles.title}>
          <h1>Programación</h1>

          <div className={styles.btn_cont}>
            <div>
              <button
                onClick={() => setShowPlaces(!showPlaces)}
              >
                Localidades
                {
                  showPlaces
                    ? <BsFillCaretDownFill/>
                    : <BsFillCaretUpFill/>
                }
              </button>
              <p
                style={{
                  borderRadius: showPlaces
                    ? "0" 
                    : "0 0 1rem 1rem"
                }}
              >Mercedes</p>

              <ul className={styles.btn_cont_list}
                style={{
                  display: showPlaces ? "block" : "none"
                }}
              >
                <li>Dolores</li>
                <li>Risso</li>
                <li>Palmitas</li>
              </ul>
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
          <CompEvent
            dayNumber={8}
            day={"SAB"}
            hour={"12:00 H"}
            sportName="REMO"
            place="Club Remeros Mercedes"
          />
          <CompEvent
            dayNumber={8}
            day={"SAB"}
            hour={"12:00 H"}
            sportName="REMO"
            place="Club Remeros Mercedes"
          />
          <CompEvent
            dayNumber={8}
            day={"SAB"}
            hour={"12:00 H"}
            sportName="REMO"
            place="Club Remeros Mercedes"
          />
          <CompEvent
            dayNumber={8}
            day={"SAB"}
            hour={"12:00 H"}
            sportName="REMO"
            place="Club Remeros Mercedes"
          />
          <CompEvent
            dayNumber={8}
            day={"SAB"}
            hour={"12:00 H"}
            sportName="REMO"
            place="Club Remeros Mercedes"
          />
          <CompEvent
            dayNumber={8}
            day={"SAB"}
            hour={"12:00 H"}
            sportName="REMO"
            place="Club Remeros Mercedes"
          />
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
