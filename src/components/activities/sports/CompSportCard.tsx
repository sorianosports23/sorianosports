import styles from "../../../css/activities/sports/CompSportCard.module.css"
import assetsFolder from "../../../utils/publicfolder"

type TCardProps = {
  name: string
  iconUrlName: string
  backgroundUrlName: string
}

const CompSportCard = ({ name, iconUrlName, backgroundUrlName }: TCardProps) => {

  const iconImage = assetsFolder + `/img/icons/${iconUrlName}`
  const backgroundImage = assetsFolder + `/img/cards/${backgroundUrlName}`

  return (
    <div 
      className={styles.sportCard}  
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      <div>
        <p>{name}</p>

        <div className={styles.sportIcon}>
          <img src={iconImage} alt={name} />
        </div>
      </div>
    </div>
  )
}

export default CompSportCard
