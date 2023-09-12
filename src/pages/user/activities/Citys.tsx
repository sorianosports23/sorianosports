import { BsList, BsSearch } from "react-icons/bs"
import User from "../User"
import styles from "../../../css/activities/departments/Departments.module.css"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import CityMap from "../../../components/activities/departments/CityMap"
import { Link, useNavigate } from "react-router-dom"
import useSearchParams from "../../../utils/useSearchParams"
import assetsFolder from "../../../utils/publicfolder"
import { sportImg } from "../../../utils/sportList"

const departments = {
  Dolores: {
    ground: ["Voleibol", "Remo"],
  },
  Cardona: {
    ground: ["Atletismo", "Karate", "Básquetbol", "Gimnadia 3ra Edad", "Hockey", "Zumba"],
  },
  Mercedes: {
    ground: [],
  },
  VillaSoriano: {
    ground: [],
  },
  Palmar: {
    ground: [],
  },
  Palmitas: {
    ground: [],
  },
  Egana: {
    ground: [],
  },
  Risso: {
    ground: [],
  },
  STACatalina: {
    ground: [],
  },
  JERodo: {
    ground: [],
  },
}

const useSearch = () => {

  const [value, setValue] = useState("")

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value)
  }

  return {
    type: "text",
    placeholder: "Ingresar localidad",
    value,
    onChange
  }
}

const NoSelected = "Ninguno seleccionado"

const setSearchParams = (cityName: string) => {
  window.history.pushState('', '', `?selected=${cityName}`)
}

const Departments = () => {

  const searchInput = useSearch()

  const [selectedDepartment, setSelectedDepartment] = useState<string | typeof NoSelected>(NoSelected)

  const [searchDepartments, setSearchDepartments] = useState(Object.keys(departments))

  const searchParams = useSearchParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (!searchInput.value) {
      setSearchDepartments(Object.keys(departments))
    } else {
      setSearchDepartments(
        Object.keys(departments).filter(name => name.toLowerCase().includes(searchInput.value.toLowerCase())) as typeof searchDepartments
      )
    }
  }, [searchInput.value])

  useEffect(() => {
    if (searchParams.searchParams && searchParams.params?.selected) {
      const selectedParam = searchParams.params.selected

      if (Object.keys(departments).includes(selectedParam)) {
        setSelectedDepartment(selectedParam)
      }

    }
  }, [searchParams])
  
  const handleSelectCity = useCallback((cityName: string) => {
    setSelectedDepartment(cityName)
    setSearchParams(cityName)
  }, [])

  return (
    <User>
      {/* FILTROS */}
      <div className={styles.filters}>
        <div className={styles.filters_content}>
          <div className={styles.input}>
            <input {...searchInput} />
            <div>
              <BsSearch/>
            </div>
          </div>
        </div>
      </div>

      {/* MAPA DEL DEPARTAMENTO */}
      <div className={styles.content} id="test">
        <CityMap
          selectDepartment={handleSelectCity}
          departments={Object.keys(departments)}
        />
      </div>

      {/* INFO DEL DEPARTAMENTO SELECCIONADO */}
      {
      selectedDepartment !== NoSelected
      && <div className={styles.department}>
        <div className={styles.selected}>
          <h3>{selectedDepartment}</h3>

          <div className={styles.selected_sports}>
            {/* <h3>Deportes</h3> */}
            <div className={styles.selected_ground}>
              <ul>
                {
                  departments[selectedDepartment as keyof typeof departments].ground.map((sport, i) => (
                    <li key={i} style={{
                      backgroundImage: `url(${assetsFolder}/img/cards/${sportImg[sport]})`
                    }}
                    >
                      <Link to={`/info/${selectedDepartment}/${sport}`}>{sport}</Link>
                    </li>
                    ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
      }
    </User>
  )
}

export default Departments
