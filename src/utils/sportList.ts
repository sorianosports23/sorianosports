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

const citySports: { [x: string]: string[] } = {
  Dolores: ["Voleibol"],
  Mercedes: ["Remo"],
  Cardona: ["Karate"],
  StaCatalina: ["Yoga"],
  JERodo: ["Basquetbol"],
  Risso: ["Zumba"],
  "Egaña": ["Gimanasia Artistica"],
  Palmitas: ["Basquetbol"],
  "Villa Soriano": ["Patin"],
  "Cañada Nieto": ["Recreacion"],
  Palmar: ["Multideportes"],
  Agraciada: ["Recreativo"]
}

type TSportPlaceInfo = {sport: string, places: {name: string, teacher: string, time: string}[]}

const sportPlaces: { [x: string]: TSportPlaceInfo[] } = {
  Dolores: [
    {
      sport: "Voleibol",
      places: [{name: "Estadio Cerrado", teacher: "Andrea Plenc", time: "18:00 - 19:00"}]
    }
  ],
  Mercedes: [
    {
      sport: "Remo",
      places: [{name: "Manzana 19", teacher: "Pablo Camesasca", time: "14:00 - 17:00"}]
    }
  ],
  Cardona: [
    {
      sport: "Karate",
      places: [{name: "Club Union", teacher: "Cristihan Funez", time: "18:15 - 19:15"}]
    }
  ],
  StaCatalina: [
    {
      sport: "Yoga",
      places: [{name: "Salón Isopanel", teacher: "Nazareno Acquitapace", time: "18:00 - 19:30"}]
    }
  ],
  JERodo: [
    {
      sport: "Basquetbol",
      places: [{name: "Club Rodo", teacher: "Emiliano Larzabal", time: "10:00 - 11:00"}]
    }
  ],
  Risso: [
    {
      sport: "Zumba",
      places: [{name: "Club Rampla", teacher: "Karen Garcilazo", time: "18:15 - 19:00"}]
    }
  ],
  "Egaña": [
    {
      sport: "Gimnasia Artistica",
      places: [{name: "Centro Parroquial", teacher: "Sol Maldonado", time: "16:30 - 18:00"}]
    }
  ],
  Palmitas: [
    {
      sport: "Basquetbol",
      places: [{name: "Club Wanderers", teacher: "Alain Francois", time: "18:30 - 19:15"}]
    }
  ],
  "Villa Soriano": [
    {
      sport: "Patin",
      places: [{name: "Plaza Deportes", teacher: "Macarena Igoa", time: "17:00 - 18:30"}]
    }
  ],
  "Cañada Nieto": [
    {
      sport: "Recreacion",
      places: [{name: "Lugar...", teacher: "Ana Slavica", time: "15:00 - 16:00"}]
    }
  ],
  Palmar: [
    {
      sport: "Multideportes",
      places: [{name: "Salón Comunal", teacher: "Bruno Mendoza", time: "18:00 - 19:00"}]
    }
  ],
  Agraciada: [
    {
      sport: "Recreativo",
      places: [{name: "Lugar", teacher: "Alejandro Sasso", time: "17:50 - 19:50"}]
    }
  ]
}

export type { TSportPlaceInfo }
export { sportList, sportIcon, sportImg, sportPlaces, citySports }
