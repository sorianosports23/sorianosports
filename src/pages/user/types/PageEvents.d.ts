type TDay = "Lunes" | "Martes" | "Miercoles" | "Jueves" | "Viernes" | "Sabado"

interface IEvents {
  [cityName: string]: Array<TEvent>
}

type TEvent = {
  name: string,
  description: string,
  dayNumber: number,
  day: string,
  hour: string,
  sportName: string,
  place: string
}