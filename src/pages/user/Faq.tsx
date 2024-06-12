import Container from "../../components/templates/Container"
import User from "./User"
import styles from "../../css/faq/Faq.module.css"
import Question from "../../components/faq/Question"
import assetsFolder from "../../utils/publicfolder"
import { useEffect, useState } from "react"
import apiGetFaq from "../../api/admin/faq/getFaq"

const Faq = () => {

  const [faqInfo, setFaqInfo] = useState<TFaq[]>([])

  useEffect(() => {
    (async () => {
      const res = await apiGetFaq()
      if (res.data) setFaqInfo(res.data)
    })()
  }, [])

  return (
    <User pageTitle="Preguntas frecuentes">
      <div className={styles.title}
        style={{
          backgroundImage: `url(${assetsFolder}/img/secretaria.webp)`
        }}
      >
        <h1>Preguntas frecuentes</h1>
      </div>

      <Container>
        <div className={styles.questions}>
          <Question
            category="Categoria"
            question={
              // [
              //   {question: "¿Qué deportes hay?", response: "Hay todo tipo de deportes tanto terrestres como acuaticos, encuentra lo que más te guste"}, 
              //   {question: "¿En que horario se desarrollan las actividades?", response: "Las actividades se desarrollan desde las 09:00 Hs hasta las 21:00, esto puede variar segun tú localidad."}, 
              //   {question: "¿En que lugares se desarrollan las actividades?", response: "Las actividades se desarrollan en los centros deportivos designados por la Intendencia"}, 
              //   {question: "¿Qué necesito para hacer las actividades?", response: "Para hacer las actividades necesitas una fotocopia de tú cédula, una fotocopia del carné del niño o adolescente si eres menor, si eres mayor solo deberas presentar una autorización médica. Los menores de 18 necesitaran presentarse con un Padre o tutor para firmar un permiso."}, 
              //   {question: "¿Hay limite de edad para hacer las disciplinas?", response: "Sí hay limite, puedes inscribirte a partir de los 5 años hasta los 75 años, si eres mayor de 75 puedes inscribirte solo con una autorización médica."}, 
              //   {question: "¿Dónde me inscribo para hacer las actividades?", response: "Puedes inscribirte en nuestras oficinas y si sino desde nuestra pagina web."},{question: "¿Cuáles son los horarios de oficina?", response: "Los horarios son de 08:00 Hs hasta las 16:00 Hs."}, 
              //   {question: "¿Las actividades tienen algún costo?", response: "No, las actividades no tienen ningun costo"}
              // ]
              faqInfo.map((faq) => ({question: faq.name, response: faq.response}))
            }
          />
        </div>
      </Container>
    </User>
  )
}

export default Faq