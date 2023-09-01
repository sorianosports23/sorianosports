import { FormEvent } from "react"

const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
  ev.preventDefault()
}

export default onSubmit
