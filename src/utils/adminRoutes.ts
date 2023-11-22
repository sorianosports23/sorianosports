type TRoute = {
  name: string
  url: string
}

const editorRoutes: TRoute[] = [
  { name: "Eventos", url: "events" },
  { name: "Noticias", url: "news"}
]

const adminRoutes: TRoute[] = [
  { name: "Usuarios", url: "users" },
  { name: "Ciudades", url: "sports"},
  { name: "Inscripciones", url: "inscriptions" },
  { name: "Contacto", url: "contact" },
  { name: "Página", url: "page" },
  ...editorRoutes
]


export { adminRoutes, editorRoutes }