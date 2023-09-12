const sportList: Array<string> = [
  "Futbol",
  "Remo",
  "Básquetbol",
  "Boxeo",
  "Voleibol",
  "Gimnasia Correctiva",
  "Futsal",
  "Gimnasia Aerobica",
  "Gimnasia Artistica",
  "Yoga",
  "Gimnasia Adulto Mayor",
  "Gimnasia Hombre y Futsal",
  "Gimnasia Funcional",
  "Karate",
  "Rugby",
  "Chiquillada",
  "Canotaje"
]

const sportIcon: { [x: string]: string } = {
  Futbol: "football.png",
  Boxeo: "boxing.png",
  Remo: "canoe.png",
  Voleibol: "volei.png",
  "Básquetbol": "basketball.png"
}

const sportImg: { [x: string]: string } = {
  Futbol: "football.jpg",
  Boxeo: "box.jpg",
  Remo: "remo.jpg",
  Voleibol: "voley.jpg",
  "Básquetbol": "basket.jpg"
}

export { sportList, sportIcon, sportImg }
