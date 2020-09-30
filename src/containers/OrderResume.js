import React, { useState,useEffect } from 'react'
import { useParams,useHistory } from 'react-router-dom'
import * as firebase from "firebase/app"

import motorcycle from './../assets/motorcycle.svg'
import moverTruck from './../assets/mover-truck.svg'
import envelope from './../assets/envelope.svg'
import box from './../assets/box.svg'
import globe from './../assets/globe.svg'
import fastDelivery from './../assets/fast-delivery.svg'
import calendar from './../assets/delivery-24.svg'
import money from './../assets/money.svg'
import location from './../assets/location.svg'
import from from './../assets/from.svg'
import distance from './../assets/distance.svg'
import timer from './../assets/timer.svg'
import clock from './../assets/clock.svg'
import packageDone from './../assets/package-done.svg'
import shield from './../assets/shield.svg'
import creditcard from './../assets/tarjeta-de-debito.svg'
import whats from './../assets/actions/whatsapp.svg'
import phone from './../assets/actions/phone.svg'
import userimg from '../assets/charters/ToyFaces_Colored_BG_56.jpg'

function getImg(title){
  if (title==='Diligencia'){return motorcycle}
  if (title==='Pesado'){return moverTruck}
  if (title==='Documentos'){return envelope}
  if (title==='Caja'){return box}
  if (title==='Agendar'){return calendar}
  if (title==='Ahora'){return fastDelivery}
  if (title==='Efectivo'){return money}
  if (title==='location'){return location}
  if (title==='distance'){return distance}
  if (title==='Tarjeta'){return creditcard}
}

function currencyFormat(price){
  return price.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
export default function OrderResume() {
  let history = useHistory()
  let { id } = useParams()
  const [courier] = useState(JSON.parse(localStorage.getItem('courier')))
  const [order,setOrder]=useState({type:"",package:"",when:"",pay:"",paymentoffer:"",city:"",road:{from:{address:"",taks:""},to:{address:"",taks:""}},courier:0,user:0})
  const [user,setUser]=useState({name:""})

  const takeOrder=()=>{
    order.courier=courier
    order.step=1
    order.tracking={dateCourierTakeOrder:new Date().toString()}
    firebase.database().ref('order/'+id).set(order)
    history.push("/courier/incourse/"+id)
  }
  useEffect(() => {
    const getUser=(id)=>{
      console.log(id);
      firebase.database().ref('user/'+id).on('value',(snapshot)=>{
        if(snapshot.val()!==null) {
          setUser(snapshot.val())
        }
      })
    }
    const watchOrder=()=>{
      if (id!=null) {
        firebase.database().ref('order/'+id).on('value',(snap)=>{
          if (snap.val()!=null) {
            setOrder(snap.val())
            getUser(snap.val().user)
          }
        })
      }else {
        //history.push("/user/myorders")
      }
    }
    watchOrder()
  }, [])
  return(
    <div className="row">
      <h5 className="poppins">Resumen del pedido:</h5>
      <div className="col s12 l6">
        <div className="row">
          <div className="card">
            <div className="card-content">
              <div className="row">
                <div className="col s2">
                  <div className="circle">
                    <img className="responsive-img img-user shadow-pink" src={userimg}/>
                  </div>
                </div>
                <div className="col s5">
                  <h5 className="no-margin">{user.name}</h5>
                  <span className="grey-text text-darken-2">Cliente</span>
                </div>
                <div className="col s5">
                  <a href={"tel:"+user.phone} className="col s6"><img className="responsive-img shadow-action" src={phone}/></a>
                  <a href={"https://api.whatsapp.com/send?phone="+user.phone+"&text=Hola "+user.name+""} target="_blank" className="col s6"><img className="responsive-img shadow-action" src={whats}/></a>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="row">
                <div className="col s2">
                  <div className="circle">
                    <img className="responsive-img shadow-city" src={globe} alt={order.city}/>
                  </div>
                </div>
                <div className="col s6">
                  <h5 className="no-margin">{order.city}</h5>
                  <span className="grey-text text-darken-2">Cuidad</span>
                </div>
              </div>
              <div className="row">
                <div className="col s2">
                  <div className="circle">
                    <img className="responsive-img shadow-road-from" src={from} alt={order.city}/>
                  </div>
                </div>
                <div className="col s10">
                  <h5 className="no-margin">{order.road.from.address}</h5>
                  <span className="grey-text text-darken-2">Dirección de recogida</span>
                </div>
              </div>
              <div className="row">
                <div className="col s2">
                  <div className="circle">
                    <img className="responsive-img shadow-road-to" src={getImg('distance')} alt={order.city}/>
                  </div>
                </div>
                <div className="col s10">
                  <h5 className="no-margin">{order.road.to.address}</h5>
                  <span className="grey-text text-darken-2">Dirección de entrega</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="row">
                <div className="col s2">
                  <div className="circle">
                    <img className="responsive-img shadow-type" src={getImg(order.package)} alt={order.package}/>
                  </div>
                </div>
                <div className="col s10">
                  <h5 className="no-margin">{order.package}</h5>
                  <span className="grey-text text-darken-2">Paquete {order.package==='Caja'?'maximo de 50x50x50 cm':''}</span>
                </div>
              </div>
              <div className="row">
                <div className="col s2">
                  <div className="circle">
                    <img className="responsive-img shadow-type" src={getImg(order.when!='Ahora'?'Agendar':'Ahora')} alt={order.when}/>
                  </div>
                </div>
                <div className="col s10">
                  <h5 className="no-margin">{order.when}</h5>
                  <span className="grey-text text-darken-2">Fecha</span>
                </div>
              </div>
              <div className="row">
                <div className="col s2">
                  <div className="circle">
                    <img className="responsive-img shadow-city" src={getImg(order.pay)} alt={order.paymentoffer}/>
                  </div>
                </div>
                <div className="col s8">
                  <h5 className="no-margin">{currencyFormat(order.paymentoffer)}</h5>
                  <span className="grey-text text-darken-2">Pago en {order.pay} {order.road.paymentInOrigin?<b>(Pago en origen)</b>:null}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <button onClick={()=>takeOrder()} className="btn green accent-4 shadow-green waves-effect col s12">Tomar Pedido</button>
        </div>
      </div>
    </div>
  )
}
