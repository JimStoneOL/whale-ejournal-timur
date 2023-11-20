import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useHttp } from '../../utils/hooks/http.hook';
import { AuthContext } from '../../utils/context/AuthContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useMessage } from '../../utils/hooks/message.hook';
import { Alert, Modal, TextField } from '@mui/material';


export const Student=({data,update,student})=>{

  const {loading, request,error,clearError} = useHttp()
  const {token} = useContext(AuthContext)
  const message = useMessage()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [form,setForm]=useState({})
  const [formError,setFormError]=useState(null)


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const updatePressHandler = async event => {
    form.id=data.id
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
    try {
      student.forEach((item)=>{
        if(item.contact==form.contact){
          message('Контакт уже занят')
          throw new Error('Ошибка. Контакт уже занят')
        }
      })
      const data = await request('http://localhost:8080/api/student/update', 'POST', {...form},{
        Authorization: `Bearer ${token}`
      })
      update()
    }catch(e){}
  }


  const deleteStudent=useCallback(async (id) => { 
    try{
      await request(`http://localhost:8080/api/student/delete/${id}`, 'POST', null,{
      Authorization: `Bearer ${token}`
    })
    update()
  }catch(e){
  }
  },[token,request])

  const deletePressHandler=event=>{
    deleteStudent(data.id)
  }

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

    return(
     <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {data.firstname} {data.lastname}
          </Typography>
          <Typography variant="body2">
            Контакты: {data.contact}
          </Typography>
        </CardContent>
        <CardActions>
        <Button variant="text"><Link to={`/estimation/${data.id}`}>Оценки</Link></Button>
          <Button variant="text" onClick={deletePressHandler}>
                Удалить
            </Button>
            <Button onClick={handleOpen} variant="text">Изменить</Button>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Редактирование
          </Typography>
          <TextField
          style={{marginTop:'2%'}}
        id="outlined-basic"
        label="Имя"
        type="text"
        name="firstname"
        variant="outlined"
        onChange={changeHandler}
        value={form.firstname} 
        />

      <TextField
        style={{marginTop:'2%'}}
        id="outlined-basic"
        label="Фамилия"
        type="text"
        name="lastname"
        variant="outlined"
        onChange={changeHandler}
        value={form.lastname} 
        />

      <TextField
      style={{marginTop:'2%'}}
        id="outlined-basic"
        label="Контакты"
        type="text"
        name="contact"
        variant="outlined"
        onChange={changeHandler}
        value={form.contact} 
        />
      {formError && <Alert severity="error">{formError}</Alert>}

        <br/>
      <Button variant="contained" onClick={updatePressHandler} style={{marginTop:'2%',marginLeft:'10%'}}>Изменить</Button>
        </Box>
      </Modal>
        </CardActions>
      </Card>
    )
}