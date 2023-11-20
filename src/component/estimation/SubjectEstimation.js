import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Estimation } from './Estimation';
import { Grid } from '@mui/material';
import { CreateEstimation } from './CreateEstimation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../../utils/hooks/http.hook';
import { AuthContext } from '../../utils/context/AuthContext';
import { useParams } from 'react-router-dom';
import { Loader } from '../../utils/component/Loader';


export const SubjectEstimation=({data,studentId,update})=>{


    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [subjectId,setSubjectId]=useState()

    const form={
      studentId:studentId,
      subjectId:subjectId
    }

    const getSubjectId = useCallback(async () => {
        try{
          const subject = await request(`http://localhost:8080/api/subject/get/by/${data.subject}`, 'GET', null, {
            Authorization: `Bearer ${token}`
          })
        setSubjectId(subject.id)
   
      } catch (e) {}
    }, [token, request])

    useEffect(() => {
      getSubjectId()
    }, [getSubjectId])
    
    if (loading) {
      return <Loader/>
    }

    return(
       <>
        <Card sx={{ minWidth: 275,marginTop:'10%' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.subject}
        </Typography>
        {
          data.estimations.map((item)=>{
            return(
            <>
            <Estimation data={item} update={update}/>
            </>
            )
          })
          }
       </CardContent>
       </Card>
       <CreateEstimation data={form} update={update}/>
       </>
    )
}