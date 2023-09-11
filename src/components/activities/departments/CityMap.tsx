import styles from "../../../css/activities/departments/CityMap.module.css"
import assetsFolder from "../../../utils/publicfolder"
import { ReactComponent as SorianoMap } from "../../../map/soriano.svg"
import { MutableRefObject, useCallback, useEffect, useRef } from "react"

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

// const City = ({name, select, x, y}: TDepartmentProps) => {
//   return (
//     <button
//       className={`${styles.cityIcon} ${styles[name]}`}
//       style={{
//         backgroundColor: "unset",
//         backgroundImage: `url(${assetsFolder}/map/department_icon.svg)`
//       }}
//       onClick={() => select(name)}
//     >
//       <p>
//         {name}
//       </p>
//     </button>
//   )
// }

const departmentsPos = {
  VillaSoriano: {
    x: 97,
    y: 76
  },
  Mercedes: {
    x: 120,
    y: 48
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

const CityMap = ({ selectDepartment, departments }: TMapProps) => {

  const map = useRef<HTMLObjectElement>(null) as MutableRefObject<HTMLObjectElement>

  const setMapHandlers = useCallback(() => {
    const mapDocument = map.current.contentDocument as Document
    departments.map((city) => {
      if (mapDocument) {
        const cityOnMap = mapDocument.getElementById(city)
        if (cityOnMap) {
          const vector = mapDocument.querySelector(`#${city} > #${city}Vec > path`) as SVGClipPathElement
          cityOnMap.addEventListener('click', () => {
            selectDepartment(city)
          })
          cityOnMap.style.animationDuration = ".8s"
          cityOnMap.style.animationIterationCount = "infinite"
          cityOnMap.style.animationTimingFunction = "linear"
          cityOnMap.onpointerenter = () => {
            vector.style.fill = "#f00"
          }
          cityOnMap.onpointerleave = () => {
            vector.style.fill = ""
          }
        }
      }
      return null
    })
  }, [departments, selectDepartment])

  useEffect(() => {
    if (map.current) {
      map.current.onload = setMapHandlers
    }
  }, [setMapHandlers])

  // useEffect(() => {
  //   setMapHandlers()
  // }, [setMapHandlers])

  useEffect(() => {
    console.log("A")
  }, [selectDepartment])

  return (
    <div className={styles.map}
      // style={{
      //   backgroundImage: `url(${assetsFolder}/map/backgroundMap.svg)`,
      //   // height: "28rem",
      //   // width: "40rem"
      // }}
    >
      {/* {
        departments.map((city, i) => (
          <City
            name={city}
            x={departmentsPos[city as keyof typeof departmentsPos].x}
            y={departmentsPos[city as keyof typeof departmentsPos].y}
            select={selectDepartment}
            key={i}
          />
        ))
      } */}
      {/* <SorianoMap/> */}
      <object ref={map} data={assetsFolder + "/map/soriano.svg"} type="image/svg+xml" style={{width: "100%"}}>

      </object>
    </div>

  )
}

export default CityMap