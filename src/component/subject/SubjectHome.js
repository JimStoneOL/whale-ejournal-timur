import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, TextField } from '@mui/material';
import { useMessage } from '../../utils/hooks/message.hook';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { useHttp } from '../../utils/hooks/http.hook';
import { Loader } from '../../utils/component/Loader';
import { Subject } from './Subject';



export const SubjectHome=()=>{

  const message = useMessage()
  const {token} = useContext(AuthContext)
  const { request, error, clearError,loading} = useHttp()
  const [form,setForm]=useState({})
  const [subject, setSubject]=useState([])
  const [formError,setFormError]=useState(null)


  const getAllSubjects = useCallback(async () => {
    try {
      const fetched = await request('http://localhost:8080/api/subject/get/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setSubject(fetched)
    } catch (e) {}
  }, [token, request])


  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])


const changeHandler = event => {
  setForm({ ...form, [event.target.name]: event.target.value })
}

const pressHandler = async event => {
  if(form.name.indexOf(' ') >= 0){
    form.name=null
    setFormError('В поле название есть пробелы')
  }
  else if((form.teacher.split(' ').length-1)>2){
    console.log(form.teacher.split(' ').length-1)
    form.teacher=null
    setFormError('В поле ФИО больше 2-х пробелов')
  }else{
    setFormError(null)
  }
  form.name = form.name.replace(/[^a-zA-Zа-яА-Я ]/g, "");
    form.teacher = form.teacher.replace(/[^a-zA-Zа-яА-Я ]/g, "");
  try {
    subject.forEach((item)=>{
      if(item.name==form.name){
        message('Название уже занято')
        throw new Error('Ошибка. Название уже занято')
      }
    })
    const data = await request('http://localhost:8080/api/subject/create', 'POST', {...form},{
      Authorization: `Bearer ${token}`
    })
    getAllSubjects()
  }catch(e){}
}

useEffect(() => {
  getAllSubjects()
  }, [getAllSubjects])

  
  if (loading) {
    return <Loader/>
  }
    return(<>
     <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <TextField 
         id="name"
         variant="outlined"
         label="Название"
         type="text"
         name="name"
         value={form.name}
         onChange={changeHandler}
       />

      <TextField
        id="teacher"
        variant="outlined"
        label="ФИО учителя"
        type="text"
        name="teacher"
        value={form.teacher}
        onChange={changeHandler}
        />
      {formError && <Alert severity="error">{formError}</Alert>}

      <Button variant="contained" style={{marginLeft:'20px',marginTop:'10px'}} onClick={pressHandler}>Добавить</Button>

      </CardContent>
    </Card>

    {subject.map((item)=>{
        return(
        <Subject data={item} update={getAllSubjects} subject={subject}/>
        )
       })}
    </>)  
}