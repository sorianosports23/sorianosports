import { BsList, BsSearch } from "react-icons/bs"
import User from "../User"
import styles from "../../../css/activities/departments/Departments.module.css"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import CityMap from "../../../components/activities/departments/CityMap"
import { Link, useNavigate } from "react-router-dom"
import useSearchParams from "../../../utils/useSearchParams"
import assetsFolder from "../../../utils/publicfolder"
import { citySports, sportImg } from "../../../utils/sportList"
import apiGetCitySports from "../../../api/page/sports/getCitySports"
import cityList from "../../../utils/cityList"

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

const NoSelected = "Ninguno seleccionado"

const setSearchParams = (cityName: string) => {
  window.history.pushState('', '', `?selected=${cityName}`)
}

const Departments = () => {

  const [selectedDepartment, setSelectedDepartment] = useState<string | typeof NoSelected>(NoSelected)
  const [sportsFromCity, setSportsFromCity] = useState<string[]>([])

  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.searchParams && searchParams.params?.selected) {
      const selectedParam = searchParams.params.selected

      if (Object.keys(cityList).includes(selectedParam)) {
        setSelectedDepartment(selectedParam)
      }

    }
  }, [searchParams])

  const getSportFromCity = useCallback(async () => {
    if (selectedDepartment === NoSelected) return

    const data = await apiGetCitySports(selectedDepartment)
    if (data.status) {
      setSportsFromCity(data.data.map(value => value.name))
    } else {
      setSportsFromCity([])
    }
  }, [selectedDepartment])
  
  const handleSelectCity = useCallback((cityName: string) => {
    setSelectedDepartment(cityName)
    setSearchParams(cityName)
  }, [])

  useEffect(() => {
    getSportFromCity()
  }, [getSportFromCity])

  return (
    <User pageTitle="Ciudades">
      {/* MAPA DEL DEPARTAMENTO */}
      <div className={styles.content} id="test">
        <CityMap
          selectDepartment={handleSelectCity}
          departments={cityList}
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
                  sportsFromCity.map((sport, i) => (
                    <li key={i} style={{
                      backgroundImage: `url(${assetsFolder}/img/cards/${sport}.jpg)`
                    }}
                    title={sport}
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
