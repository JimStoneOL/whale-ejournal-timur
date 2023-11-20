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


export const Subject=({data,update,subject})=>{

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
        if(item.name===form.name){
          message('Название уже занято')
          throw new Error('Ошибка. Название уже занято')
        }
      })
      const data = await request('http://localhost:8080/api/subject/update', 'POST', {...form},{
        Authorization: `Bearer ${token}`
      })
      update()
    }catch(e){}
  }

    const deleteSubject=useCallback(async (id) => { 
        try{
          await request(`http://localhost:8080/api/subject/delete/${id}`, 'POST', null,{
          Authorization: `Bearer ${token}`
        })
        update()
      }catch(e){
      }
      },[token,request])
    
      const deletePressHandler=event=>{
        deleteSubject(data.id)
      }

      useEffect(() => {
        message(error)
        clearError()
      }, [error, message, clearError])

    return(
        <Card sx={{ minWidth: 275 }}>
           <CardContent>
             <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
               {data.name}
             </Typography>
             <Typography variant="body2">
               ФИО: {data.teacher}
             </Typography>
           </CardContent>
           <CardActions>
           <Button variant="text" size='small' onClick={deletePressHandler}>
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
         id="name"
         variant="outlined"
         label="Название"
         type="text"
         name="name"
         value={form.name}
         onChange={changeHandler}
       />

      <TextField
      style={{marginTop:'2%'}}
        id="teacher"
        variant="outlined"
        label="ФИО учителя"
        type="text"
        name="teacher"
        value={form.teacher}
        onChange={changeHandler}
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