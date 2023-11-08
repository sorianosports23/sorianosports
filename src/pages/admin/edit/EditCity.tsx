import Admin from "../Admin"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Loading from "../../Loading"
import apiGetCitySports from "../../../api/page/sports/getCitySports"

const EditCity = () => {

  const { city } = useParams()
  const [citySports, setCitySports] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if (!city) return
    (async () => {
      const res = await apiGetCitySports(city)
      if (res.status) {
        setCitySports(res.data as typeof citySports)
      }
    })()
  }, [city])

  if (loading) {
    return (
      <Loading/>
    )
  }


  return (
    <Admin route_title="Editar ciudades">
      {city}
      {
        citySports.map((city, i) => (
          <div key={i}>{JSON.stringify(city)}</div>
        ))
      }
    </Admin>
  )  
}

export default EditCity
