import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (url) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState({})

  const doFetch = useCallback((options = {}) => {
    setOptions(options)
    setIsLoading(true)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      return
    }
    const fetchData = async () => {
      try {
        const res = await axios(url, options)
        setResponse(res.data)
      } catch (err) {
        const data = err.response ? err.response.data : 'Server error'
        setError(data)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [isLoading, url, options])

  return [{ response, error, isLoading }, doFetch]
}
export default useFetch
