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
import { Student } from './Student';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
    </Box>
  );

export const StudentHome=()=>{

 const message = useMessage()
  const {token} = useContext(AuthContext)
  const { request, error, clearError,loading} = useHttp()
  const [form,setForm]=useState({})
  const [student, setStudent]=useState([])
  const [formError,setFormError]=useState(null)

  const getAllStudents = useCallback(async () => {


    try {
      const fetched = await request('http://localhost:8080/api/student/get/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setStudent(fetched)
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
  if(form.firstname.indexOf(' ') >= 0){
    form.firstname=null
    setFormError('В поле имя есть пробелы')
  }
  else if(form.lastname.indexOf(' ') >= 0){
    form.lastname=null
    setFormError('В поле фамилия есть пробелы')
  }
  else if(form.contact.indexOf(' ') >= 0){
    form.contact=null
    setFormError('В поле контакты есть пробелы')
  }else{
    setFormError(null)
  }
  form.firstname = form.firstname.replace(/[^a-zA-Zа-яА-Я ]/g, "");
  form.lastname = form.lastname.replace(/[^a-zA-Zа-яА-Я ]/g, "");
  student.forEach((item)=>{
    if(item.contact==form.contact){
      message('Контакт уже занят')
      throw new Error('Ошибка. Контакт уже занят')
    }
  })
  try {
    const data = await request('http://localhost:8080/api/student/create', 'POST', {...form},{
      Authorization: `Bearer ${token}`
    })

    getAllStudents()
  }catch(e){}
}

useEffect(() => {
    getAllStudents()
  }, [getAllStudents])

  
  if (loading) {
    return <Loader/>
  }
    return(<>
     <Card sx={{ minWidth: 275 }}>
      <CardContent>

      <TextField
        id="outlined-basic"
        label="Имя"
        type="text"
        name="firstname"
        variant="outlined"
        onChange={changeHandler}
        value={form.firstname} 
        />

      <TextField
        id="outlined-basic"
        label="Фамилия"
        type="text"
        name="lastname"
        variant="outlined"
        onChange={changeHandler}
        value={form.lastname} 
        />

      <TextField
        id="outlined-basic"
        label="Контакты"
        type="text"
        name="contact"
        variant="outlined"
        onChange={changeHandler}
        value={form.contact} 
        />
      {formError && <Alert severity="error">{formError}</Alert>}

      <Button variant="contained" style={{marginLeft:'20px',marginTop:'10px'}} onClick={pressHandler}>Добавить</Button>

      </CardContent>
    </Card>

    {student.map((item)=>{
        return(
        <Student data={item} update={getAllStudents} student={student}/>
        )
       })}
    </>)    
}