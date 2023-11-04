import { useState, useCallback } from 'react'

export const useLoadButton = () => {
    const [loading, setLoading] = useState(false)
    const [stopping, setStopping] = useState(false)
    const [error, setError] = useState()
    const [data, setData] = useState()
  
    const handleClick = useCallback(() => {
      if (!loading) {
        setLoading(true)
        setError()
        setData()
      } else {
        setStopping(true)
      }
    }, [loading])
  
    const handleFinish = useCallback((data, err) => {
      if (stopping) {
        setError('Операция отменена')
        setStopping(false)
      }
  
      err && setError(err)    
      setLoading(false)
      setData(data)
    }, [stopping])
  
    return {loading, stopping, title: loading ? 'Отменить' : 'Загрузить', handleClick, error, data, handleFinish}
  }
  