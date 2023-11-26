import { ChangeEvent, useState } from "react"

const useForm = (initialValue: any, minLength: number = 1, maxLength: number = 9999, callback?: () => void) => {
  const [value, setValue] = useState<any>(initialValue)
  const [error, setError] = useState<"false" | "true">("false")

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value)

    if (typeof initialValue === "string" && typeof ev.target.value !== "string") {
      return setError("true")
    }

    if (typeof initialValue === "number" && isNaN(Number(ev.target.value))) {
      return setError("true")
    }

    if (typeof initialValue === "number" && Number(ev.target.value) < 0) {
      return setError("true")
    }

    if (!ev.target.value || ev.target.value === undefined) {
      return setError("true")
    }

    if (ev.target.value.length < minLength || ev.target.value.length > maxLength) {
      return setError("true")
    }

    if (callback) callback()
    setError("false")
  }

  return {
    value,
    onChange,
    data_error: error
  }
}

export default useForm
