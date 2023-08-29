import styles from "../../../css/activities/departments/CompCityMap.module.css"
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

const CompDepartment = ({name, select, x, y}: TDepartmentProps) => {
  return (
    <button
      className={styles.cityIcon}
      style={{
        left: x,
        top: y,
        backgroundColor: "unset",
        backgroundImage: `url(${assetsFolder}/map/department_icon.svg)`
      }}
      onClick={() => select(name)}
    >
      <p>
        {name}
      </p>
    </button>
  )
}

const departmentsPos = {
  VillaSoriano: {
    x: 97,
    y: 76
  },
  Mercedes: {
    x: 140,
    y: 58
  },
  Dolores: {
    x: 58,
    y: 110
  },
  Palmar: {
    x: 381,
    y: 10
  },
  Palmitas: {
    x: 205,
    y: 82
  },
  Egaña: {
    x: 283,
    y: 94
  },
  Risso: {
    x: 332,
    y: 111
  },
  StaCatalina: {
    x: 439,
    y: 156
  },
  JERodo: {
    x: 385,
    y: 136
  },
  Cardona: {
    x: 522,
    y: 158
  }
}

const CompDepartmentsMap = ({ selectDepartment, departments }: TMapProps) => {
  return (
    <div className={styles.map}
      style={{
        backgroundImage: `url(${assetsFolder}/map/backgroundMap.svg)`,
        height: "28rem",
        width: "40rem"
      }}
    >
      {
        departments.map((city, i) => (
          <CompDepartment
            name={city}
            x={departmentsPos[city as keyof typeof departmentsPos].x}
            y={departmentsPos[city as keyof typeof departmentsPos].y}
            select={selectDepartment}
            key={i}
          />
        ))
      }
    </div>
  )
}

export default CompDepartmentsMap