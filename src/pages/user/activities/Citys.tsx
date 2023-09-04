import { BsList, BsSearch } from "react-icons/bs"
import User from "../User"
import styles from "../../../css/activities/departments/Departments.module.css"
import { ChangeEvent, useEffect, useState } from "react"
import CityMap from "../../../components/activities/departments/CityMap"
import { Link } from "react-router-dom"
import useSearchParams from "../../../utils/useSearchParams"

const departments = {
  Dolores: {
    ground: ["Gimnasia correctiva", "Voleibol", "Futsal", "Gimnasia aerobica", "Gimnasia artistica", "Yoga", "Gimnasia adulto mayor", "Gimnasia hombre y futsal", "Gimnasia funcional", "Karate", "Rugby", "Chiquillada"],
    water: ["Canotaje"]
  },
  Cardona: {
    ground: ["Atletismo", "Karate", "Básquetbol", "Gimnadia 3ra Edad", "Hockey", "Zumba"],
    water: []
  },
  Mercedes: {
    ground: [],
    water: []
  },
  VillaSoriano: {
    ground: [],
    water: []
  },
  Palmar: {
    ground: [],
    water: []
  },
  Palmitas: {
    ground: [],
    water: []
  },
  Egaña: {
    ground: [],
    water: []
  },
  Risso: {
    ground: [],
    water: []
  },
  StaCatalina: {
    ground: [],
    water: []
  },
  JERodo: {
    ground: [],
    water: []
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
  
  const handleSelectCity = (cityName: string) => {
    setSelectedDepartment(cityName)
    setSearchParams(cityName)
  }

  return (
    <User>
      {/* FILTROS */}
      <div className={styles.filters}>
        <div className={styles.filters_content}>
          <button
            className={styles.sports_dropdown}
            data-open={true}
          >
            <p>
              <BsList/> Todos
            </p>

            <ul>
              <li>Futbol</li>
              <li>Basquetbol</li>
              <li>Boleibol</li>
              <li>Remo</li>
            </ul>
          </button>

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
          departments={searchDepartments}
        />
      </div>

      {/* INFO DEL DEPARTAMENTO SELECCIONADO */}
      {
      selectedDepartment !== NoSelected
      && <div className={styles.department}>
        <div className={styles.selected}>
          <h3>{selectedDepartment}</h3>

          <div className={styles.selected_sports}>
            <h3>Deportes</h3>
            <div className={styles.selected_ground}>
              <h4>Terrestres</h4>
              <ul>
                {
                  selectedDepartment 
                    !== NoSelected
                    && departments[selectedDepartment as keyof typeof departments].ground.map((sport, i) => (
                        <li key={i}>
                          <Link to={`/info/${selectedDepartment}/${sport}`}>{sport}</Link>
                        </li>
                       ))
                }
              </ul>
            </div>

            <div className={styles.selected_divisor}>
              <span></span>
            </div>

            <div className={styles.selected_water}>
              <h4>Acuaticos</h4>
              <ul>
                {
                  selectedDepartment === NoSelected
                    ? <></>
                    : 
                      departments[selectedDepartment as keyof typeof departments].water.map((sport, i) => (
                          <li key={i}>
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
