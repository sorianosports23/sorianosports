import styles from "../../../css/activities/sports/SportCard.module.css"
import assetsFolder from "../../../utils/publicfolder"

type TCardProps = {
  name: string
  iconUrlName: string
  backgroundUrlName: string
  select: () => void
}

const SportCard = ({ name, iconUrlName, backgroundUrlName, select }: TCardProps) => {

  const iconImage = assetsFolder + `/img/icons/sports/${iconUrlName}.png`
  const backgroundImage = assetsFolder + `/img/cards/${backgroundUrlName}.jpg`

  return (
    <button 
      className={styles.sportCard}  
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
      onClick={select}
    >
      <div>
        <p>{name}</p>

        <div className={styles.sportIcon}>
          <img src={iconImage} alt={""} />
        </div>
      </div>
    </button>
  )
}

export default SportCard
