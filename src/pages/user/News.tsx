import NewsCard from "../../components/news/NewsCard"
import Container from "../../components/templates/Container"
import User from "./User"
import styles from "../../css/news/News.module.css"

const News = () => {
  return (
    <User>
      <Container>
        <div className={styles.news_cont}>
          <NewsCard/>
          <NewsCard/>
          <NewsCard/>
          <NewsCard/>
          <NewsCard/>
          <NewsCard/>
          <NewsCard/>
          <NewsCard/>
          <NewsCard/>
          <NewsCard/>
        </div>
      </Container>
    </User>
  )
}

export default News
