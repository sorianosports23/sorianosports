import styles from "../../../css/activities/schools/CompSchool.module.css"

type TSchoolProps = {
  name: string
}

const CompSchool = ({ name }: TSchoolProps) => {
  return (
    <div className={styles.card}>
      <p>{name}</p>

      <div className={styles.background}></div>
      <div className={styles.border}></div>
    </div>
  )
}

export default CompSchool
