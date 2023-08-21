import PageUser from "../PageUser"
import styles from "../../../css/activities/departments/PageDepartments.module.css"
import CompDepartmentsMap from "../../../components/templates/CompDepartmentsMap"

const PageDepartments = () => {
  return (
    <PageUser>
      <div className={styles.content} id="test">
        <CompDepartmentsMap/>
      </div>
    </PageUser>
  )
}

export default PageDepartments
