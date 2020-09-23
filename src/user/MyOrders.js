import React , { useState,useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import SideBar from './SideBar'

import motorcycle from './../assets/motorcycle.svg'
import moverTruck from './../assets/mover-truck.svg'
import envelope from './../assets/envelope.svg'
import box from './../assets/box.svg'
import globe from './../assets/globe.svg'
import fastDelivery from './../assets/fast-delivery.svg'
import calendar from './../assets/delivery-24.svg'
import money from './../assets/money.svg'
import from from './../assets/from.svg'
import distance from './../assets/distance.svg'
import clock from './../assets/clock.svg'

function getImg(title){
  if (title==='Liviano'){return motorcycle}
  if (title==='Pesado'){return moverTruck}
  if (title==='Documentos'){return envelope}
  if (title==='Caja'){return box}
  if (title==='Agendar'){return calendar}
  if (title==='Ahora'){return fastDelivery}
  if (title==='Bogotá'){return globe}
  if (title==='Medellín'){return globe}
  if (title==='Efectivo'){return money}
}
function currencyFormat(price){
  return price.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
function details(order,history) {
  history.push("/courier/order/"+order.key)
}

export default function MyOrders(props) {
  let history = useHistory()
  const [list,setList]=useState([])
  const [cookies,setCookie,removeCookie] = useCookies()
  const getList = async()=>{
    props.database.ref('order').orderByChild('user').equalTo(cookies.user.phone).on("value", function(snapshot) {
      var flist=[]
      setList([])
      snapshot.forEach(function(data) {
        var childData = data.val()
        childData.id= data.key
        flist.push(childData)
      })
      setList(flist)
    })
  }
  useEffect(() => {
    getList()
  }, [])
  return(
    <div className="row">
      <div className="col s10">
        {
          list.map((order,i)=>
          <div key={i}>
            <div className="col s12 l6">
              <div className="card">
                <div className="card-content">
                <div className="row">
                  <div className="col s2">
                    <div className="circle">
                      <img className="responsive-img shadow-road-from" src={from} alt={order.city}/>
                    </div>
                  </div>
                  <div className="col s10">
                    <h6 className="no-margin">{order.road.from.address}</h6>
                    <span className="grey-text text-darken-2">Dirección de recogida</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col s2">
                    <div className="circle">
                      <img className="responsive-img shadow-road-to" src={distance} alt={order.city}/>
                    </div>
                  </div>
                  <div className="col s10">
                    <h6 className="no-margin">{order.road.to.address}</h6>
                    <span className="grey-text text-darken-2">Dirección de entrega</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col s2">
                    <div className="circle">
                      <img className="responsive-img shadow-type" src={getImg(order.package)} alt={order.package}/>
                    </div>
                  </div>
                  <div className="col s10">
                    <h6 className="no-margin">{order.package}</h6>
                    <span className="grey-text text-darken-2">Paquete {order.package==='Caja'?'maximo de 50x50x50 cm':''}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col s2">
                    <div className="circle">
                      <img className="responsive-img shadow-purple" src={clock} alt={"hora de creación de la orden"}/>
                    </div>
                  </div>
                  <div className="col s10">
                    <h6 className="no-margin">{moment(order.creation).format('hh:mm A')}</h6>
                    <span className="grey-text text-darken-2">Hora de creación</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col s2 l2">
                    <div className="circle">
                      <img className="responsive-img shadow-city" src={getImg(order.pay)} alt={order.paymentoffer}/>
                    </div>
                  </div>
                  <div className="col s4 l4">
                    <h5 className="no-margin">{currencyFormat(order.paymentoffer)}</h5>
                    <span className="grey-text text-darken-2">{order.pay}</span>
                  </div>
                  <div className="col s12 l6">
                    <button onClick={()=>details(order,history)} className="btn-flat waves-effect col s6">Detalles</button>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          )
        }
      </div>
      <div className="col s2">
        <SideBar active="myorders"/>
      </div>
    </div>
  )
}
