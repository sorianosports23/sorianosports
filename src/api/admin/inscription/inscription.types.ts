const InscriptionStatusLabel = {
  1: "En espera",
  2: "Inscrito",
  3: "Dado de baja"
}

type TinyInt = 1 | 0

type TInscription = {
  name: string
  lastname: string
  birthday: string
  ci: number
  imageCI?: string //img
  gender: TinyInt
  medicalRecord: TinyInt
  expiration?: string
  imageMedicalRecord: string //img
  city: string
  residence: string
  phone: number
  email?: string
  schoolYear?: string
  alternativePhone?: number
  sportTimeStart: string
  sportTimeEnd: string
  activity: string
  activityPlace: string
  anotherSports?: string
  oldPractisedSport?: string
  medicalAssitence: TinyInt
  whatMedicalCare?: string
  medicalAssistencePhone?: number
  bloodGroup?: string
  diabetes: TinyInt
  hypertension: TinyInt
  fractures: TinyInt
  allergy: TinyInt
  asthma: TinyInt
  otherDiseases?: string
  wearGlasses: TinyInt
  whatTypeGlasses?: string
  state: 1 | 2 | 3 
}

export { InscriptionStatusLabel }
export type { TInscription }