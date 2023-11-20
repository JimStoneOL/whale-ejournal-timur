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
import { SubjectEstimation } from './SubjectEstimation';

export const EstimationByStudent=()=>{

    const name = useParams().id
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [studentName,setStudentName]=useState('')
    const [estimation,setEstimation]=useState([])

    const getAllEstimationByStudent = useCallback(async () => {
      try {
        const fetched = await request(`http://localhost:8080/api/estimation/get/by/${name}`, 'GET', null, {
          Authorization: `Bearer ${token}`
        })  
        setEstimation(fetched.subjectEstimations)
        setStudentName(fetched.name)
      } catch (e) {}
    }, [token, request])

    useEffect(() => {
      getAllEstimationByStudent()
    }, [getAllEstimationByStudent])
    
    if (loading) {
      return <Loader/>
    }

    if(estimation==null){
      return(<>
        <Card sx={{ minWidth: 275,marginTop:'10%' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {studentName}
        </Typography>
        <Typography variant="body2">
         Нет предметов
        </Typography>
      </CardContent>
    </Card>
      </>)
    }
    
    return(<>
     <Card sx={{ minWidth: 275,marginTop:'10%' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {studentName}
        </Typography>
        <Typography variant="body2">
            {
            estimation.map((item)=>{
            return(<>
             <SubjectEstimation data={item} studentId={name} update={getAllEstimationByStudent}/>
            </>
            )
          })}
        </Typography>
      </CardContent>
    </Card>

    </>)
}