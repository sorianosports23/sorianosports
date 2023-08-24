import styles from "../../../css/activities/sports/CompSportCard.module.css"

type TCardProps = {
  name: string
  iconUrlName: string
  backgroundUrlName: string
}

const CompSportCard = ({ name, iconUrlName, backgroundUrlName }: TCardProps) => {

  const iconImage = require(`../../../assets/icons/${iconUrlName}`)
  const backgroundImage = require(`../../../assets/cards/${backgroundUrlName}`)

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
