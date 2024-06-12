import NewsCard from "./NewsCard"
import styles from "../../css/news/NewsRecents.module.css"

type TNewsRecentsProps = {
  news: Array<TNews>
}

const NewsRecents = ({ news }: TNewsRecentsProps) => {
  if (news.length === 0) {
    return null
  }
  
  return (
    <div className={styles.content}>
      {
        news.map((newsCard, i) => (
          <NewsCard
            {...newsCard}
            key={i}
          />
        ))
      }
    </div>
  )
}

export default NewsRecents