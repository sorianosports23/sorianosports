type TApiAdminDeleteNewsRequest = {
  token: string
  id: number
}

type TApiAdminModifyNewsParams = {
  token: string
  id: number
  name: string
  description: string
  img?: string
  note: string
}

type TApiAdminModifyNewsRequest = {
  token: string
  id: number
  attr: "name" | "description" | "img" | "note"
  newValue: string
}