import { useState } from "react"
import styles from "../../../css/activities/departments/CompDepartmentsMap.module.css"
import assetsFolder from "../../../utils/publicfolder"

type TMapProps = {
  selectDepartment: (department: string) => void
  departments: Array<string>
}

type TDepartmentProps = {
  x: number
  y: number
  name: string,
  select: (name: string) => void
}

type TSizeState = {
  width: string | 0
  height: string | 0,
  transform: string
}

const CompDepartment = ({name, select, x, y}: TDepartmentProps) => {

  const hoverSize: TSizeState = {
    width: "10rem",
    height: "8rem",
    transform: "translateY(-8rem) translateX(-10rem)"
  }

  const initialSize: TSizeState = {
    width: 0,
    height: 0,
    transform: "none"
  }

  const [size, setSize] = useState<TSizeState>(initialSize)

  return (
    <button
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 32,
        height: 47,
        border: "none",
        backgroundColor: "unset",
        backgroundImage: `url(${assetsFolder + "/map/department_icon.svg"})`
      }}
      onClick={() => select(name)}
      onMouseEnter={() => setSize(hoverSize)}
      onMouseLeave={() => setSize(initialSize)}
    >
      <div className={styles.departmentInfo}
        style={{...size}}
      >
        <p>{name}</p>
      </div>
    </button>
  )
}

const departmentsPos = {
  Dolores: {
    x: 111,
    y: 178
  },
  Cardona: {
    x: 385,
    y: 105
  }
}

const CompDepartmentsMap = ({ selectDepartment, departments }: TMapProps) => {
  return (
  <div id="departments_map" style={{width: 645, height: 451, position: 'relative'}}>
    <div id="department_background" style={{width: 645, height: 451, left: 0, top: 0, position: 'absolute', background: `url(${assetsFolder + "/map/background.svg"})`, border: '0.94px #373435 solid'}}></div>
    {/* <button onClick={() => selectDepartment("Dolores")} id="department_dolores" style={{width: 32, height: 47, left: 111, top: 178, position: 'absolute', background: `url(${process.env.PUBLIC_URL + "/assets/map/department_icon.svg"})`, border: "none"}}></button>
    <button onClick={() => selectDepartment("Cardona")} id="department_unknown" style={{width: 31, height: 47, left: 385, top: 105, position: 'absolute', background: `url(${process.env.PUBLIC_URL + "/assets/map/department_icon.svg"})`, border: "none"}}></button> */}
    {
      departments.map((department, i) => (
        <CompDepartment 
          name={department}
          x={departmentsPos[department as keyof typeof departmentsPos].x}
          y={departmentsPos[department as keyof typeof departmentsPos].y}
          select={selectDepartment}
          key={i}
        />
      ))
    }
  </div>
  )
}

export default CompDepartmentsMap