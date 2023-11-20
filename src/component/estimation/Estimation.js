import { Card, Typography } from "@mui/material"
import { useHttp } from '../../utils/hooks/http.hook';
import { AuthContext } from '../../utils/context/AuthContext';
import { useCallback, useContext, useEffect } from 'react';
import { useMessage } from '../../utils/hooks/message.hook';
import dayjs from 'dayjs';

export const Estimation=({data,update})=>{

  const {loading, request,error,clearError} = useHttp()
  const {token} = useContext(AuthContext)
  const message = useMessage()

  const deleteEstimation=useCallback(async (id) => { 
    try{
      await request(`http://localhost:8080/api/estimation/delete/${id}`, 'POST', null,{
      Authorization: `Bearer ${token}`
    })
    update()
  }catch(e){
  }
  },[token,request])

  const deletePressHandler=event=>{
    deleteEstimation(data.id)
  }

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])
 
    return(<>
     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.estimation}
        </Typography>
        <Typography sx={{ fontSize: 12 }} variant="body2">
          {dayjs(data.date.split('T')[0]).format('DD-MM-YYYY')}
          </Typography>
          <a style={{cursor: 'pointer',color:'blue'}} onClick={deletePressHandler}>
                Удалить
            </a>
    </>)
}