import { useState, useEffect } from "react"

const useAreValid = (nick: string, comment: string) => {
  const [valid, setValid] = useState(true)

  useEffect(() => {
    if (nick.length < 2) setValid(false)
    else if (comment.length < 1) setValid(false)
    else setValid(true)
  }, [nick.length, comment.length])

  return valid
}

export default useAreValid
