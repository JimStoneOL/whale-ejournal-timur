import '../styles/mater.css'
import { toast } from 'materialize-css'
import {useCallback} from 'react'

export const useMessage = () => {
  return useCallback(text => { 
    if (window.M && text) {
      toast({html:text})
    }
  }, [])
}