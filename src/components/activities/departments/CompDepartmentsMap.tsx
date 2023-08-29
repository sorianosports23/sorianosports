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

  // return (
  //   <button
  //     style={{
  //       position: "absolute",
  //       left: x,
  //       top: y,
  //       width: 32,
  //       height: 47,
  //       border: "none",
  //       backgroundColor: "unset",
  //       backgroundImage: `url(${assetsFolder + "/map/department_icon.svg"})`
  //     }}
  //     onClick={() => select(name)}
  //     onMouseEnter={() => setSize(hoverSize)}
  //     onMouseLeave={() => setSize(initialSize)}
  //   >
  //     <div className={styles.departmentInfo}
  //       style={{...size}}
  //     >
  //       <p>{name}</p>
  //     </div>
  //   </button>
  // )
  return (
    <button
      className={styles.cityIcon}
      style={{
        left: x,
        top: y,
        backgroundColor: "unset",
        backgroundImage: `url(${assetsFolder}/map/department_icon.svg)`
      }}
    >
      <p>
        {name}
      </p>
    </button>
  )
}

const departmentsPos = {
  VillaSoriano: {
    x: 87,
    y: 76
  },
  Mercedes: {
    x: 127,
    y: 58
  },
  Dolores: {
    x: 58,
    y: 58
  },
  Palmar: {
    x: 381,
    y: 0
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
    y: 176
  },
  JERodo: {
    x: 385,
    y: 146
  },
  Cardona: {
    x: 522,
    y: 188
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
  // <div id="departments_map" style={{width: 645, height: 451, position: 'relative'}}>
  //   <div id="department_background" style={{width: 645, height: 451, left: 0, top: 0, position: 'absolute', background: `url(${assetsFolder + "/map/background.svg"})`, border: '0.94px #373435 solid'}}></div>
  //   {/* <button onClick={() => selectDepartment("Dolores")} id="department_dolores" style={{width: 32, height: 47, left: 111, top: 178, position: 'absolute', background: `url(${process.env.PUBLIC_URL + "/assets/map/department_icon.svg"})`, border: "none"}}></button>
  //   <button onClick={() => selectDepartment("Cardona")} id="department_unknown" style={{width: 31, height: 47, left: 385, top: 105, position: 'absolute', background: `url(${process.env.PUBLIC_URL + "/assets/map/department_icon.svg"})`, border: "none"}}></button> */}
  //   {
  //     departments.map((department, i) => (
  //       <CompDepartment 
  //         name={department}
  //         x={departmentsPos[department as keyof typeof departmentsPos].x}
  //         y={departmentsPos[department as keyof typeof departmentsPos].y}
  //         select={selectDepartment}
  //         key={i}
  //       />
  //     ))
  //   }
  // </div>
  // Mapa
  // <div style={{width: 131, height: 49, position: 'relative'}}>
  //   {/* Mapa fondo */}
  //   <div className="Vector" style={{width: 131, height: 49, left: 0, top: 0, position: 'absolute', background: '#00B5BD', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.75)', border: '0.50px rgba(55, 52, 53, 0.75) solid'}}></div>
  //   {/* Villa Soriano */}
  //   <div style={{width: 10, height: 9, left: 18, top: 13, position: 'absolute'}}>
  //     <div className={styles.cityIcon} style={{width: 5, height: 8, left: 1, top: 0, position: 'absolute', background: 'black', boxShadow: '0px 5px 4px rgba(0, 0, 0, 0.75)', border: '0.15px black solid'}}></div>
  //     <div className={styles.cityText} style={{left: 0, top: 8, position: 'absolute', color: 'white', fontSize: 1.20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Villa Soriano</div>
  //   </div>
  //   {/* Mercedes */}
  //   <div style={{width: 9, height: 10, left: 26, top: 10, position: 'absolute'}}>
  //     <div className={styles.cityIcon} style={{width: 9, height: 2, left: 0, top: 8, position: 'absolute', color: 'white', fontSize: 1.50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}></div>
  //     <div className="Vector" style={{width: 5, height: 8, left: 1, top: 0, position: 'absolute', background: 'black', boxShadow: '0px 5px 4px rgba(0, 0, 0, 0.75)', border: '0.15px black solid'}}></div>
  //   </div>

  //   <div className="Group8" style={{width: 7, height: 10, left: 12, top: 22, position: 'absolute'}}>
  //     <div className="Vector" style={{width: 5, height: 8, left: 1, top: 0, position: 'absolute', background: 'black', boxShadow: '0px 5px 4px rgba(0, 0, 0, 0.75)', border: '0.15px black solid'}}></div>
  //     <div className="Dolores" style={{left: 0, top: 8, position: 'absolute', color: 'white', fontSize: 1.50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>DOLORES</div>
  //   </div>
  //   <div className="Group4" style={{width: 7, height: 10, left: 78, top: 0, position: 'absolute'}}>
  //     <div className="Vector" style={{width: 5, height: 8, left: 1, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
  //       <div className="Vector" style={{width: 5, height: 8, background: 'black', boxShadow: '0px 5px 4px rgba(0, 0, 0, 0.75)', border: '0.15px black solid'}}></div>
  //     </div>
  //     <div className="Palmar" style={{left: 0, top: 8, position: 'absolute', color: 'white', fontSize: 1.50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}> PALMAR</div>
  //   </div>
  //   <div className="Group5" style={{width: 8, height: 10, left: 42, top: 14, position: 'absolute'}}>
  //     <div className="Vector" style={{width: 5, height: 8, left: 1, top: 0, position: 'absolute', background: 'black', boxShadow: '0px 5px 4px rgba(0, 0, 0, 0.75)', border: '0.15px black solid'}}></div>
  //     <div className="Palmitas" style={{left: 0, top: 8, position: 'absolute', color: 'white', fontSize: 1.50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>PALMITAS</div>
  //   </div>
  //   <div className="Group6" style={{width: 6, height: 10, left: 58, top: 16, position: 'absolute'}}>
  //     <div className="Vector" style={{width: 5, height: 8, left: 0, top: 0, position: 'absolute', background: 'black', boxShadow: '0px 5px 4px rgba(0, 0, 0, 0.75)', border: '0.15px black solid'}}></div>
  //     <div className="EgaA" style={{left: 0, top: 8, position: 'absolute', color: 'white', fontSize: 1.50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>EGAÑA</div>
  //   </div>
  //   <div className="Group10" style={{width: 5, height: 10, left: 68, top: 19, position: 'absolute'}}>
  //     <div className="Vector" style={{width: 5, height: 8, left: 0, top: 0, position: 'absolute', background: 'black', boxShadow: '0px 5px 4px rgba(0, 0, 0, 0.75)', border: '0.15px black solid'}}></div>
  //     <div className="Risso" style={{left: 0, top: 8, position: 'absolute', color: 'white', fontSize: 1.50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>RISSO</div>
  //   </div>
  //   <div className="Group3" style={{width: 11, height: 10, left: 90, top: 30, position: 'absolute'}}>
  //     <div className="Vector" style={{width: 5, height: 8, left: 2, top: 0, position: 'absolute', background: 'black', boxShadow: '0px 5px 4px rgba(0, 0, 0, 0.75)', border: '0.15px black solid'}}></div>
  //     <div className="StaCatalina" style={{left: 0, top: 8, position: 'absolute', color: 'white', fontSize: 1.50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>STA. CATALINA</div>
  //   </div>
  //   <div className="Group7" style={{width: 8, height: 10, left: 79, top: 25, position: 'absolute'}}>
  //     <div className="Vector" style={{width: 5, height: 8, left: 1, top: 0, position: 'absolute', background: 'black', boxShadow: '0px 5px 4px rgba(0, 0, 0, 0.75)', border: '0.15px black solid'}}></div>
  //     <div className="JERodo" style={{left: 0, top: 8, position: 'absolute', color: 'white', fontSize: 1.50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>J. E. RODO</div>
  //   </div>
  //   <div className="Group9" style={{width: 8, height: 10, left: 107, top: 32, position: 'absolute'}}>
  //     <div className="Vector" style={{width: 5, height: 8, left: 1, top: 0, position: 'absolute', background: 'black', boxShadow: '0px 5px 4px rgba(0, 0, 0, 0.75)', border: '0.15px black solid'}}></div>
  //     <div className="Cardona" style={{left: 0, top: 8, position: 'absolute', color: 'white', fontSize: 1.50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>CARDONA</div>
  //   </div>
  // </div>
  )
}

export default CompDepartmentsMap