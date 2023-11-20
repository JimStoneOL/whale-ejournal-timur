import { CardMedia, TextField } from "@mui/material"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { useMessage } from "../../utils/hooks/message.hook";
import { useHttp } from "../../utils/hooks/http.hook";
import logo from '../../utils/img/logo.jpg'
import '../../utils/styles/font.css'

export const AuthPage=()=>{

  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    username: 'anna.olegovna@mail.ru', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  // useEffect(() => {
  //   window.M.updateTextFields()
  // }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    try {
      const data = await request('http://localhost:8080/api/auth/signin', 'POST', {...form})
      auth.login(data.token, data.id,data.roles)
    } catch (e) {}
  }

    return(<>
    <Card sx={{ width: '50%',marginTop:'5%', backgroundColor:'#8f48cd',borderRadius:'20px'}}>
    <CardMedia
        component="img"
        image={logo}
        alt="whale"
      />
      <CardContent>
        <LockIcon style={{width:50}}/>
      <TextField
       id="password"
       type="password"
       name="password"
       label="Введите пароль" 
       variant="outlined" 
       value={form.password} 
       onChange={changeHandler}/>
      <Button variant="contained" style={{marginLeft:'20px',marginTop:'10px',backgroundColor:'white', color:'black'}} onClick={loginHandler}><div className="txt">Войти</div></Button>
        </CardContent>
        </Card>
    </>)
}