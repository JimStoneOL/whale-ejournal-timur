import React, {useCallback, useContext, useEffect, useState} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import '../styles/font.css'
import '../styles/navbar.css'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { CardMedia, TextField } from '@mui/material'
import logo from '../img/logo.jpg'

 export const NavbarJSX=()=>{

  const history = useHistory()
  const auth = useContext(AuthContext)


const logoutHandler = event => {
  auth.logout()
  history.push('/')
}

  return(
   <>
  <div class="containerbody">
    <input data-function="swipe" id="swipe" type="checkbox"/>
    <label data-function="swipe" for="swipe"><KeyboardArrowLeftIcon/></label>
    <label data-function="swipe" for="swipe"><KeyboardArrowRightIcon/></label>
 
  <div class="leftsidebar">
    <nav class="menubar">
      
      <CardMedia
        component="img"
        image={logo}
        alt="whale"
      />
     
      <li class="active"><NavLink to={'/student'}>Студенты</NavLink></li>
      <li><NavLink to={'/subject'}>Предметы</NavLink></li>
      <li><NavLink to={'/about'}>О приложении</NavLink></li>
      <li><NavLink to={'/iteacher'}>Руководство преподавателя</NavLink></li>
      <li><NavLink to={'/istudent'}>Руководство студента</NavLink></li>
      <li><NavLink to={'/book'}>Учебники</NavLink></li>
      <li><NavLink to={'/lesson'}>Позновательные уроки</NavLink></li>
      <li><a onClick={logoutHandler}>Выйти</a></li>
      <li></li>
    </nav>
  </div>
  </div>
   </>
  )
}

