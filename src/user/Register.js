import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

import M from 'materialize-css'

export default function Register(props){
  let history = useHistory()

  const [phone,setPhone] = useState('')
  const [mail,setMail] = useState('')
  const [name,setName] = useState('')
  const [userExist,setUserExist] = useState(false)
  const go = (event) => {
    event.preventDefault()
    const data ={ mail:mail,name:name,phone:phone,account:{verified:false} }
    if (!userExist) {
      fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify({user:data})
      })
      .then(res => {
        res.text()
        .then(response => {
          if (response==='success') {
            history.push('/')
          }else {
            M.toast({html:"Hubo un error por favor intenta nuevamente"})
          }
        })
      })
      .then((result)=>{},
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error)=>{console.log(error)}
      )
    }
  }
  const getUser=(phone)=>{
    setPhone(phone)
    setUserExist(false)
    if (phone.length>8) {
      console.log(phone)
      fetch('http://localhost:8080/user/get/secret', {
        method: 'POST',
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify({phone:phone})
      })
      .then(res => {
        res.text()
        .then(response => {
          if (response!=='') {
            if (JSON.parse(response).account.verified) {
              M.toast({html:"Tu cuenta ya fue verificada"})
              history.push('/')
            }
            setUserExist(true)
            M.toast({html:"Existe un usuario registrado con ese teléfono",displayLength:4000})

          }else {
            //M.toast({html:"Usuario no existe"})
          }
        })
      })
      .then((result)=>{},
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error)=>{console.log(error)}
      )
      /*props.database.ref('user/' + phone).on('value',(snapshot)=>{
        if(snapshot.val()!==null){
          setName(snapshot.val().name.substring(0, mail.length - mail.length+4) + "**********")
          setMail(snapshot.val().mail.substring(0, mail.length - mail.length+4) + "**********")
          setUserExist(true)
          M.toast({html:"Tu usuario existe, completamos tus datos para continuar",displayLength:4000})
        }else {
          setName("")
          setMail("")
          setUserExist(false)
        }
      })*/
    }
    setPhone(phone)
  }
  return(
    <div className="container">
      <div className="row">
        <h5 className="center">Registro</h5>
        <form className="col s12" onSubmit={go}>
          <div className="input-field col s12 l6">
            <i className="material-icons prefix">phone</i>
            <input value={phone} onChange={e=>getUser(e.target.value)} id="phone" placeholder="Escriba su teléfono" type="tel" className="validate" required/>
          </div>
          {
            !userExist?
            <>
            <div className="input-field col s12 l6">
              <i className="material-icons prefix">person</i>
              <input value={name} onChange={e=>setName(e.target.value)} id="name" placeholder="Nombre" className="validate"/>
            </div>
            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input value={mail} onChange={e=>setMail(e.target.value)} id="mail" placeholder="Email" type="email" className="validate" required/>
            </div>
            <button className="primary btn waves-effect waves-light col s12" type="submit">Confirmar</button>
            </>
          :
          <p>Existe un usuario registrado con ese teléfono</p>
          }

        </form>
      </div>
    </div>
  )
}
