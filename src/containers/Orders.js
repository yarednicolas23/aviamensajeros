import React from 'react'
import moment from 'moment'

import SideBar from '../components/SideBar'

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
export default class Orders extends React.Component {
  constructor(props){
    super(props)
    this.state={list:[]}
  }
  componentDidMount(){
    this.props.database.ref('order').on('value',(snap)=>{
      console.log(snap.val())
      this.state.list=[]
      //this.setState({list:{}})
      snap.forEach((childSnapshot)=> {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        childData.key= childKey
        this.state.list.push(childData)
      })
      this.setState(this.state)
    })
  }
  takeOrder(data){
    var id= data.key
    data.courier=1
    data.key=null
    this.props.database.ref('order/'+id).set(data)
  }
  currencyFormat(price){
    return price.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }
  onSelect = data => { this.setState(data) }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s2">
            <SideBar/>
          </div>
          <div className="col s10">
            {
              this.state.list.map((order,key)=>
                <div className="col s12 l6" key={key}>
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
                        <h5 className="no-margin">{this.currencyFormat(order.paymentoffer)}</h5>
                        <span className="grey-text text-darken-2">{order.pay}</span>
                      </div>
                      <div className="col s12 l6">
                        <button onClick={()=>this.takeOrder(order)} className="btn-flat waves-effect col s6">Detalles</button>
                        <button onClick={()=>this.takeOrder(order)} className="btn primary waves-effect col s6">Tomar</button>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <table className="hide">
          <thead>
            <tr>
                <th>Tipo</th>
                <th>Tipo de pago</th>
                <th>Oferta de pago</th>
                <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {
              this.state.list.map((order,key)=>
                <tr key={key}>
                  <td>{order.package}</td>
                  <td>{order.pay}</td>
                  <td>{this.currencyFormat(order.paymentoffer)}</td>
                  <td><button onClick={()=>this.takeOrder(order)} className="btn primary waves-effect">Tomar</button></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}
