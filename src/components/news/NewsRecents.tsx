import NewsCard, { TNewsCardProps } from "./NewsCard"
import styles from "../../css/news/NewsRecents.module.css"

type TNewsRecentsProps = {
  news: Array<TNews>
}

const NewsRecents = ({ news }: TNewsRecentsProps) => {
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