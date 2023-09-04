import { PropsWithChildren } from "react"
import styles from "../../css/templates/Container.module.css"

const Container = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={styles.container}
    >
      { children }
    </div>
  )
}

export default Container