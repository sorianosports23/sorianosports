import NewsCard from "../../components/news/NewsCard"
import Container from "../../components/templates/Container"
import User from "./User"
import styles from "../../css/news/News.module.css"

const News = () => {
  return (
    <User>
      <Container>
        <div className={styles.news_cont}>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
        </div>
      </Container>
    </User>
  )
}

export default News
