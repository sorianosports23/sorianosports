import styles from "../../../css/activities/departments/CityMap.module.css"
import assetsFolder from "../../../utils/publicfolder"
import { MutableRefObject, useCallback, useEffect, useRef } from "react"

type TMapProps = {
  selectDepartment: (department: string) => void
  departments: Array<string>
}

const CityMap = ({ selectDepartment, departments }: TMapProps) => {

  const map = useRef<HTMLObjectElement>(null) as MutableRefObject<HTMLObjectElement>

  const setMapHandlers = useCallback(() => {
    const mapDocument = map.current.contentDocument as Document
    departments.map((city) => {
      if (mapDocument) {
        const cityOnMap = mapDocument.getElementById(city)
        if (cityOnMap) {
          const vector = mapDocument.querySelector(`[id='${city}'] > [id='${city}Vec'] > path`) as SVGClipPathElement
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

  useEffect(() => {
    console.log("A")
  }, [selectDepartment])

  return (
    <div className={styles.map}>
      <object ref={map} data={assetsFolder + "/map/soriano.svg"} type="image/svg+xml" style={{width: "100%"}}>

      </object>
    </div>

  )
}

export default CityMap