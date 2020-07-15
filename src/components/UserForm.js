import React, { useState } from 'react'

export default function UserForm(props) {
  const [mail,setMail] = useState('')
  const [name,setName] = useState('')
  const [phone,setPhone] = useState('')
  const go = ()=>{
    const data ={ mail:mail, name:name, phone:phone }
    props.setUser(data)
  }
  const getUser=(phone)=>{
    if (phone.length>8) {
      props.firebase.ref('user/' + phone).on('value',(snapshot)=>{
        if(snapshot.val()!==null) {
          setName(snapshot.val().name)
          setMail(snapshot.val().mail)
        }else {
          setName("")
          setMail("")
        }
      })
    }
    setPhone(phone)
  }
  return(
    <div className="row">
      <form className="col s12" onSubmit={go} action="javascript:void(0)">
        <div className="input-field col s12 l6">
          <input value={phone} onChange={e=>getUser(e.target.value)} id="phone" placeholder="Escriba su teléfono" type="tel" className="validate" required/>
        </div>
        <div className="input-field col s12 l6">
          <input value={name} onChange={e=>setName(e.target.value)} id="name" placeholder="Nombre" className="validate"/>
        </div>
        <div className="input-field col s12">
          <input value={mail} onChange={e=>setMail(e.target.value)} id="mail" placeholder="Email" type="email" className="validate" required/>
        </div>
        <button className="primary btn waves-effect waves-light col s12" type="submit">Confirmar</button>
      </form>
    </div>
  )
}
