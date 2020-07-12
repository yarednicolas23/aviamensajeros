import React, { useState } from 'react'
import {
  useHistory
} from "react-router-dom"
import M from 'materialize-css'

import motorcycle from './../assets/motorcycle.svg'
import moverTruck from './../assets/mover-truck.svg'
import envelope from './../assets/envelope.svg'
import box from './../assets/box.svg'
import globe from './../assets/globe.svg'
import fastDelivery from './../assets/fast-delivery.svg'
import calendar from './../assets/delivery-24.svg'
import money from './../assets/money.svg'
import location from './../assets/location.svg'
import distance from './../assets/distance.svg'

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
  if (title==='location'){return location}
  if (title==='distance'){return distance}
}
export default class PaymentOffer extends React.Component{
  constructor(props){
    super(props)
    this.state={
      order:{
        type:localStorage.getItem('type'),
        package:localStorage.getItem('package'),
        when:localStorage.getItem('how'),
        pay:localStorage.getItem('pay'),
        paymentoffer:localStorage.getItem('paymentoffer'),
        city:localStorage.getItem('city'),
        road:JSON.parse(localStorage.getItem('road')),
        courier:0
      },
      key:'',
      loader:true
    }
  }
  componentDidMount(){
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  }
  //const [paymentOffer,setPaymentOffer]= useState(null)
  //let history = useHistory();
  /*
  const go = ()=>{
     history.push("/package")
  }*/
  writeOrderData() {
    this.props.database.ref('order/').push(this.state.order).then((snap)=>{this.setState({key:snap.key});this.watchOrder()})

  }
  watchOrder(){
    var instance = M.Modal.getInstance(document.getElementById('orderConfirmation'))
    instance.open()
    if (this.state.key!='') {
      console.log(this.state.key);
      this.props.database.ref('order/'+this.state.key).on('value',(snap)=>{
        console.log(snap.val())
        if (snap.val().courier!=0) {
          this.setState({loader:false})
        }
      })
    }
  }
  render(){
    return(
      <div className="row">
        <h4 className="poppins grey-text text-darken-3">Resumen del pedido:</h4>
        <div className="col s12 l6">
          <div className="col s6 l3 center hide">
            <img className="responsive-img" src={getImg(this.state.order.pay)} alt={this.state.order.pay}/>
            <h6 className="no-margin grey-text"><b>Pago {this.state.order.pay}:</b></h6>
            <h6 className="poppins">${this.state.order.paymentoffer}</h6>
          </div>
          <div className="row">
            <div className="card col s12">
              <div className="card-content">
                <div className="row">
                  <div className="col s2">
                    <div className="circle">
                      <img className="responsive-img shadow-city" src={getImg(this.state.order.city)} alt={this.state.order.city}/>
                    </div>
                  </div>
                  <div className="col s6">
                    <h5 className="no-margin">{this.state.order.city}</h5>
                    <span className="grey-text text-darken-2">Cuidad</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col s2">
                    <div className="circle">
                      <img className="responsive-img shadow-road-from" src={getImg('location')} alt={this.state.order.city}/>
                    </div>
                  </div>
                  <div className="col s10">
                    <h5 className="no-margin">{this.state.order.road.from.address}</h5>
                    <span className="grey-text text-darken-2">Dirección de recogida</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col s2">
                    <div className="circle">
                      <img className="responsive-img shadow-road-to" src={getImg('distance')} alt={this.state.order.city}/>
                    </div>
                  </div>
                  <div className="col s10">
                    <h5 className="no-margin">{this.state.order.road.to.address}</h5>
                    <span className="grey-text text-darken-2">Dirección de entrega</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="card col s12">
              <div className="card-content">
                <div className="row">
                  <div className="col s2">
                    <div className="circle">
                      <img className="responsive-img shadow-type" src={getImg(this.state.order.type)} alt={this.state.order.type}/>
                    </div>
                  </div>
                  <div className="col s6">
                    <h5 className="no-margin">{this.state.order.type}</h5>
                    <span className="grey-text text-darken-2">Tipo</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col s2">
                    <div className="circle">
                      <img className="responsive-img shadow-type" src={getImg(this.state.order.package)} alt={this.state.order.package}/>
                    </div>
                  </div>
                  <div className="col s10">
                    <h5 className="no-margin">{this.state.order.package}</h5>
                    <span className="grey-text text-darken-2">Paquete</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col s2">
                    <div className="circle">
                      <img className="responsive-img shadow-type" src={getImg(this.state.order.when)} alt={this.state.order.when}/>
                    </div>
                  </div>
                  <div className="col s10">
                    <h5 className="no-margin">{this.state.order.when}</h5>
                    <span className="grey-text text-darken-2">Fecha</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col s12 l6">
          <div className="row">
            <div className="col s12">
              <iframe className="col s12" height="300" src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d31814.48123130295!2d-74.13359700564403!3d4.627934234833798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x8e3f99a3b6aa0d79%3A0xfae1b01aa8483257!2zQ2wuIDE5ICM0LTUyLCBCb2dvdMOh!3m2!1d4.6041937!2d-74.0694962!4m5!1s0x8e3f9c49227dd81b%3A0x2c1e8f2a7bd9da12!2sCl.%206a%20%2393d-67%2C%20Bogot%C3%A1!3m2!1d4.6522565!2d-74.16267859999999!5e0!3m2!1ses!2sco!4v1594528223617!5m2!1ses!2sco" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <div className="row">
                    <div className="col s2">
                      <div className="circle">
                        <img className="responsive-img shadow-city" src={getImg(this.state.order.pay)} alt={this.state.order.paymentoffer}/>
                      </div>
                    </div>
                    <div className="col s6">
                      <h5 className="no-margin">{this.state.order.paymentoffer}</h5>
                      <span className="grey-text text-darken-2">{this.state.order.pay}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <a onClick={()=>this.writeOrderData()} className="col s12 btn primary waves-effect waves-light">Confirmar servicio</a></div>
                    </div>
                  <div className="row hide">
                    <div className="col s2">
                      <div className="circle">
                        <img className="responsive-img shadow-road-from" src={getImg('location')} alt={this.state.order.city}/>
                      </div>
                    </div>
                    <div className="col s10">
                      <h5 className="no-margin">{this.state.order.road.from.address}</h5>
                      <span className="grey-text text-darken-2">Dirección de recogida</span>
                    </div>
                  </div>
                  <div className="row hide">
                    <div className="col s2">
                      <div className="circle">
                        <img className="responsive-img shadow-road-to" src={getImg('distance')} alt={this.state.order.city}/>
                      </div>
                    </div>
                    <div className="col s10">
                      <h5 className="no-margin">{this.state.order.road.to.address}</h5>
                      <span className="grey-text text-darken-2">Dirección de entrega</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="orderConfirmation" className="modal bottom-sheet modal-confirmation">
          {
            this.state.loader?
            <div className="modal-content">
              <h4>Espere un momento</h4>
              <p>Un mensajero tomara su pedido en un momento</p>
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
            </div>
            :
            <div className="modal-content">
              <h4>¡Listo! 🛵</h4>
              <p>Tu pedido fue tomado por el mensajero </p>
            </div>
          }
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
      </div>
    )
  }
}
