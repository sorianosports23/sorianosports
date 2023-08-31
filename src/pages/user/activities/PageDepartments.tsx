import { BsList, BsSearch } from "react-icons/bs"
import PageUser from "../PageUser"
import styles from "../../../css/activities/departments/PageDepartments.module.css"
import { ChangeEvent, useEffect, useState } from "react"
import CompCityMap from "../../../components/activities/departments/CompCityMap"
import { Link } from "react-router-dom"

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

const PageDepartments = () => {

  const searchInput = useSearch()

  const [selectedDepartment, setSelectedDepartment] = useState<string | typeof NoSelected>(NoSelected)

  const [searchDepartments, setSearchDepartments] = useState(Object.keys(departments))

  useEffect(() => {
    if (!searchInput.value) {
      setSearchDepartments(Object.keys(departments))
    } else {
      setSearchDepartments(
        Object.keys(departments).filter(name => name.toLowerCase().includes(searchInput.value.toLowerCase())) as typeof searchDepartments
      )
    }
  }, [searchInput.value])

  return (
    <PageUser>
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
        <CompCityMap
          selectDepartment={setSelectedDepartment}
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
                          <Link to={`/${selectedDepartment}/${sport}`}>{sport}</Link>
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
                          <li key={i}>{sport}</li>
                      ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
      }
    </PageUser>
  )
}

export default PageDepartments
