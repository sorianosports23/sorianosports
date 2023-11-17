type TInscriptionRecord = {
  sport: string
  signedUp: 1|2|3
  dateStart: string
  dateEnd?: string
  teacher: string
  place: string
  city: string
  exitSport: () => void
}