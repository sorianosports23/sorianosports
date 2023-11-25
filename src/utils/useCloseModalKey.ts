import { DetailedHTMLProps, HTMLAttributes, KeyboardEvent, KeyboardEventHandler } from "react"

type TCloseModalProps = {
  open: boolean
  close: () => void
}

const useCloseModalKey = ({ open, close }: TCloseModalProps): DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> => {
  const onKeyDown = (ev: KeyboardEvent<HTMLDivElement>) => {
    if (open && ev.key === "Escape") {
      close()
    }
  }
  
  return {
    onKeyDown,
    role: "button",
    tabIndex: open ? 10 : -1
  }
}

export default useCloseModalKey
