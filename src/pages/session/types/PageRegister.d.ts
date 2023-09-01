import { ChangeEvent } from "react"

type TInputProps = {
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void,
  value: string | number
}