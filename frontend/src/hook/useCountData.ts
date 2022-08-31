import { useState } from "react"

const useCountLength = async(model: any | string) =>{
  const [count, setCount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [message, setMessage]= useState(null)

  
  return { count, isLoading, isError, message }
}
export default useCountLength