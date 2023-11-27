import { useCallback, useEffect, useState } from "react"
import styles from "../../css/index/GreatEvents.module.css"

const UseTime = ({ date }: { date: string }) => {

  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [diffState, setDiffState] = useState(0)

  const handleCheckTimeLeft = useCallback(() => {
    const actualTime = new Date(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} 00:00:00`).getTime()
    const nextTime = new Date(date + " 00:00:00").getTime()
    const diff = nextTime - actualTime

    setDiffState(diff)
    setDays(diff / (1000*60*60*24))
    setHours(Math.round(diff / (1000*60*60)))
    setMinutes(Math.round(diff / (1000*60)))
    setSeconds(Math.round(diff / (1000)))
  }, [date])

  useEffect(() => {
    handleCheckTimeLeft()
  }, [handleCheckTimeLeft])

  return (
    <div className={styles.time}>
      {
        diffState < 0
        ?
        <div><p>EN CURSO</p></div>
        :
        (
          <>
          <div>
            <p>Quedan:</p>
            {/* <span>a</span> */}
          </div>
          {
            days > 1 &&
            <div>
              <p>{Math.round(days)} DIAS</p>
              {/* <span>Dias</span> */}
            </div>
          }

          {
            hours <= 24 &&
            <div>
              <p>{hours} HORAS</p>
              {/* <span>Horas</span> */}
            </div>
          }
          
          {
            minutes <= 60 &&
            <div>
              <p>{minutes} MINUTOS</p>
              {/* <span>Minutos</span> */}
            </div>
          }

          {
            seconds <= 60 &&
            <div>
              <p>{seconds} SEGUNDOS</p>
              {/* <span>Segundos</span> */}
            </div>
          }
          </>
        )
      }
    </div>
  )
}

export default UseTime
