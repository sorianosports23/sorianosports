import User from "../User"
import styles from "../../../css/directive/Directive.module.css"
import Container from "../../../components/templates/Container"
import { useEffect, useState } from "react"
import api from "../../../api/apiRoute"
import Loading from "../../Loading"
import apiGetDirective from "../../../api/page/directive/getDirective"

const DirectiveCard = ({ name, rank, image }: TDirective) =>{
  return (
    <div className= {styles.card}>
      <div className={styles.image_gen}>
        <img className={styles.image} src={api+image} alt={name} />
    </div>

    <div className={styles.info}>
      <h2>{name}</h2>
      <p>{rank}</p>
    </div>
  </div>
  )
}
const Directive = () => {

  const [directivePeople, setDirectivePeople] = useState<TDirective[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    handleGetDirective()
  }, [])

  const handleGetDirective = async () => {
    const data = await apiGetDirective()
    console.log(data)
    if (data.status) {
      setDirectivePeople(data.data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <Loading/>
    )
  }

  return (
    <User pageTitle="Equipo">
      <Container>
        <h1 className={styles.title}>EQUIPO DE DEPORTES</h1>
        <p className={styles.description}>Nuestro equipo</p>

      <div className={styles.general}>
        {
          directivePeople.map((person, i) => (
            <DirectiveCard
              {
                ...person
              }
              key={i}
            />
          ))
        }
      </div>

      </Container>
    </User>
  )

}

export default Directive