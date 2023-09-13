import User from "../User"
import styles from "../../../css/directive/Directive.module.css"
import assetsFolder from "../../../utils/publicfolder"
import Container from "../../../components/templates/Container"

type DirectiveCardProps = {
  name: string
  img: string
  rol: string
}

const directivos: DirectiveCardProps[] = [
  { name: "Noemi Viera", img: "director.jpg", rol: "Director" },
  { name: "Pablo Caceres", img: "avatar-male.jpg", rol: "Sub-Director" },
  { name: "Juan Castillo", img: "avatar-male.jpg", rol: "Secretario" },
]
const DirectiveCard = ({name, img, rol}:DirectiveCardProps) =>{
  return (
    <div className= {styles.card}>
      <div className={styles.image_gen}>
        <img className={styles.image} src={assetsFolder + "/img/" + img} alt="Director"/>
    </div>

    <div className={styles.info}>
      <h2>{name}</h2>
      < p>{rol}</p>
    </div>
  </div>
  )
}
const Directive = () =>{

  return (
    <User>
      <Container>
        <h1 className={styles.title}>DIRECTIVA</h1>

      <div className={styles.general}>
        
        {
          directivos.map((directivo, i) => (
            <DirectiveCard name={directivo.name} img={directivo.img} rol={directivo.rol} key={i}/>
          ))
        }

      </div>

      </Container>
    </User>
  )

}

export default Directive