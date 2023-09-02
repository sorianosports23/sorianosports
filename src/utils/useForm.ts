import { ChangeEvent, useState } from "react"

const useForm = (initialValue: any) => {
  const [value, setValue] = useState<any>(initialValue)

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value)
  }

  return {
    value,
    onChange
  }
}

export default useForm
