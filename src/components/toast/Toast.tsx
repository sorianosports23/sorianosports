import { BsCheckLg, BsXLg } from "react-icons/bs"
import styles from "../../css/toast/Toast.module.css"

const toastIcons = {
  ok: <BsCheckLg/>,
  error: <BsXLg/>
}

type TToastProps = {
  message: string
  secondMessage?: string
  closeIn: number
  icon: keyof typeof toastIcons
  open: boolean
}

const Toast = ({ message, secondMessage, closeIn, icon, open }: TToastProps) => {
  return (
    <div 
      className={styles.toast}
      data-icon={icon}
      data-open={open}
    >
      <div className={styles.icon}>
        {
          toastIcons[icon]
        }
      </div>

      <div className={styles.message}>
        <p>{message}</p>
        {
          secondMessage 
            && <span>{secondMessage}</span>
        }
      </div>

      <div className={styles.slider} style={{animationDuration: `${closeIn}s`}}></div>
    </div>
  )
}

export default Toast
