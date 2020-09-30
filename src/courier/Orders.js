import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import M from 'materialize-css'

import SideBar from '../courier/SideBar'

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
import creditcard from './../assets/tarjeta-de-debito.svg'

function getImg(title){
  if (title==='Diligencia'){return motorcycle}
  if (title==='Liviano'){return motorcycle}
  if (title==='Pesado'){return moverTruck}
  if (title==='Documentos'){return envelope}
  if (title==='Caja'){return box}
  if (title==='Agendar'){return calendar}
  if (title==='Ahora'){return fastDelivery}
  if (title==='Bogotá'){return globe}
  if (title==='Medellín'){return globe}
  if (title==='Efectivo'){return money}
  if (title==='Tarjeta'){return creditcard}
}
function currencyFormat(price){
  return price.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
function takeOrder(data,courier,database,history) {
  var key = data.id
  data.courier=courier
  data.id=null
  data.step=1
  data.tracking={dateCourierTakeOrder:new Date().toString()}
  database.ref('order/'+key).set(data)
  history.push("/courier/incourse/"+key)
}
function details(order,history) {
  history.push("/courier/order/"+order.id)
}
export default function Orders(props) {
  let history = useHistory()
  const [list,setList]=useState([])
  const [courier] = useState(JSON.parse(localStorage.getItem('courier')))
  const getList = async()=>{
    props.database.ref('order').orderByChild('courier').equalTo(0).on("value", function(snapshot) {
      var flist=[]
      setList([])
      snapshot.forEach(function(data) {
        var childData = data.val()
        childData.id= data.key
        flist.push(childData)
        //console.log(data.key);
      })
      setList(flist)
    })
  }
  useEffect(() => {
    getList()
  }, [])

  return(
    <div className="row">
      <div className="col s12">
        <h5><b>Lista de pedidos</b></h5>
        {
          list.map((order,i)=>
          <div key={i}>
            <div className="col s12 m12 l6">
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
                    <div className="col s10 l10">
                      <h5 className="no-margin">{currencyFormat(order.paymentoffer)}</h5>
                      <span className="grey-text text-darken-2">Pago en {order.pay} {order.road.paymentInOrigin?<b>(Pago en origen)</b>:null}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s6"><button onClick={()=>details(order,history)} className="btn primary waves-effect">Detalles</button></div>
                    <div className="col s6"><button onClick={()=>takeOrder(order,courier.phone,props.database,history)} className="btn green accent-4 shadow-green waves-effect">Tomar Pedido</button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )
        }
      </div>
    </div>
  )
}
