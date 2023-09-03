import { ChangeEvent, useState } from "react"

const useForm = (initialValue: any) => {
  const [value, setValue] = useState<any>(initialValue)
  const [error, setError] = useState(false)

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value)

    if (typeof initialValue === "string" && typeof ev.target.value !== "string") {
      return setError(true)
    }

    if (typeof initialValue === "number" && isNaN(Number(ev.target.value))) {
      return setError(true)
    }

    if (typeof initialValue === "number" && Number(ev.target.value) < 0) {
      return setError(true)
    }

    if (!ev.target.value || ev.target.value === undefined) {
      return setError(true)
    }

    setError(false)
  }

  return {
    value,
    onChange,
    data_error: error
  }
}

export default useForm
