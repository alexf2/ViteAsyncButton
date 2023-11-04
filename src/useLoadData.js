import { useRef, useEffect } from 'react'
import { CancelError } from './errors'

const DELAY_MS = 1500
const SECRET_CODE = 'code 111'
const DATA = 'Payload data XXX'

export const useLoadData = (onFinish, cancel, loading) => {
    const timerIdRef = useRef()
    const rejectRef = useRef()
    const onfinishRef = useRef(onFinish)
    onfinishRef.current = onFinish
  
    useEffect(() => {
      if (loading && !timerIdRef.current) {
        console.log('Starting loading')
  
        new Promise((resolve, reject) => {
          rejectRef.current = reject
          timerIdRef.current = setTimeout(() => resolve(SECRET_CODE), DELAY_MS)
  
        }).then((code) => new Promise((resolve, reject) => {
          rejectRef.current = reject
          console.log('Code recieved: ', code)
          timerIdRef.current = setTimeout(() => resolve(DATA), DELAY_MS)        
  
        })).then((data) => {
          console.log('Data recieved: ', data)
          onfinishRef.current(data)
          timerIdRef.current = undefined
          rejectRef.current = undefined
        })
        .catch((err) => {
          console.log('Caugth error: ', err)
          timerIdRef.current && clearTimeout(timerIdRef.current)
          timerIdRef.current = undefined
          rejectRef.current = undefined
  
          onfinishRef.current(undefined, err)
        })
        
      }
    }, [loading])
  
    useEffect(() => {
      if (cancel && timerIdRef.current) {
        console.log('Cancelled')
        clearTimeout(timerIdRef.current)
        timerIdRef.current = undefined
        rejectRef.current && rejectRef.current(new CancelError())
      }
    }, [cancel])
  }