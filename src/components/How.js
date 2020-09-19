import React, { useState } from 'react'
import {
  useHistory
} from "react-router-dom"
import M from 'materialize-css'
import moment from 'moment'

import calendaricon from './../assets/google-calendar.svg'
import clockicon from './../assets/clock.svg'

import Button from './Button'

export default function How(props) {
  const [option,setOption]=useState('now')
  const [date,setDate]=useState(undefined)
  const [time,setTime]=useState(undefined)

  let history = useHistory()
  const go =(data)=>{
    localStorage.setItem("how",data)
    history.push("/pay")
  }
  const calendar =()=>{
    setOption('date')
    var elems = document.querySelectorAll('.datepicker')
    M.Datepicker.init(elems,{onClose:()=>clock(),onSelect:(e)=>setDate(e.toString())})
    var instance = M.Datepicker.getInstance(document.getElementById("picker"))
    instance.open()
  }
  const clock =()=>{
    var elems = document.querySelectorAll('.timepicker')
    M.Timepicker.init(elems,{onSelect:function(){setTime(this.hours+" "+this.minutes+" "+this.amOrPm)}})
    var instance = M.Timepicker.getInstance(document.getElementById("clock"))
    instance.open()
  }
  return(
    <div className="col s12 center">
      <h3 className="title grey-text text-darken-3">¿Cuando lo llevamos?</h3>
      <div className="cards-container">
        {
          option==='now'?
          <>
          <Button title="Ahora" handleClick={()=>go("Ahora")} state={props.state}/>
          <Button title="Agendar" handleClick={()=>calendar()} state={props.state}/>
          </>
          :
          <div className="row">
            <div className="card">
              <div className="card-content text-left">
                <div className="row">
                  <div className="col s2">
                    <div className="circle">
                      <img className="responsive-img shadow-blue" src={calendaricon} alt={"fecha programada"}/>
                    </div>
                  </div>
                  <div className="col s10 left-align">
                    <h5 className="no-margin">{moment(date).format('dddd DD MMMM YYYY')}</h5>
                    <span className="grey-text text-darken-2">Fecha del pedido</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col s2">
                    <div className="circle">
                      <img className="responsive-img shadow-road-from" src={clockicon} alt={"hora de recogida"}/>
                    </div>
                  </div>
                  <div className="col s10 left-align">
                    <h5 className="no-margin">{time}</h5>
                    <span className="grey-text text-darken-2">Hora del pedido</span>
                  </div>
                </div>
                <a onClick={()=>go(moment(date).format('dddd DD MMMM YYYY')+" "+time)} className="col s12 btn primary waves-effect waves-light">Confirmar</a>
              </div>
            </div>
          </div>
        }
        <input id="picker" type="text" className="datepicker hide" />
        <input id="clock" type="text" className="timepicker hide"/>
      </div>
    </div>
  )
}
