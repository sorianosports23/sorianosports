import { PropsWithChildren } from "react"
import styles from "../../css/templates/CompContainer.module.css"

const CompContainer = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={styles.container}
    >
      { children }
    </div>
  )
}

export default CompContainer