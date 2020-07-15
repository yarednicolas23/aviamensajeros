import React, { useState } from 'react'
import courier from './../assets/charters/ToyFaces_Tansparent_BG_29.png'

export default function CourierView(props) {
  const [mail,setMail] = useState(props.courier.mail)
  const [name,setName] = useState(props.courier.name)
  const [phone,setPhone] = useState(props.courier.phone)
  
  return(
    <div className="row">
      <div className="col s12">
        <div className="card">
          <div className="card-content">
            <div className="row">
              <div className="col s2">
                <div className="circle">
                  <img className="responsive-img shadow-courier" src={courier} alt={"foto del mensajero"}/>
                </div>
              </div>
              <div className="col s6">
                <h5 className="no-margin">{name}</h5>
                <span className="grey-text text-darken-2">Mensajero</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
