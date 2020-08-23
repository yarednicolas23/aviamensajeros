import React from 'react'
import { withRouter } from "react-router"
import moment from 'moment'

import M from 'materialize-css'
import UserForm from '../components/UserForm'

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

import whats from './../assets/actions/whatsapp.svg'
import phone from './../assets/actions/phone.svg'

import courier from './../assets/charters/ToyFaces_Tansparent_BG_29.png'

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


class OrderResume extends React.Component{
  constructor(props){
    super(props)
    this.state={
      order:{
        type:"",
        package:"",
        when:"",
        pay:"",
        paymentoffer:"",
        city:"",
        road:{from:{address:"",taks:""},to:{address:"",taks:""}},
        courier:0,
        user:0
      },
      user:{
        email:"",
        name:"",
        phone:""
      },
      courier:{
        email:"",
        name:"",
        phone:""
      },
      count:30,
      suggets:false,
      undo:false,
      key:'',
      loader:{order:true,user:false}
    }
  }
  componentDidMount(){
    var elems = document.querySelectorAll('.modal')
    M.Modal.init(elems)
    const id = this.props.match.params.id
    console.log(id);
    if (id!=null) {
      this.state.key=id
      this.watchOrder()
    }
  }

  writeOrderData() {
    this.state.order.creation=new Date().toString()
    this.props.database.ref('order/').push(this.state.order).then((snap)=>{this.setState({key:snap.key});this.goToOrder(snap.key);this.watchOrder()})
  }
  goToOrder = e => {
    this.props.history.push("/resume/"+e);
  };
  watchOrder(){
    var instance = M.Modal.getInstance(document.getElementById('orderConfirmation'))
    instance.open()
    this.countDown()
    if (this.state.key!=null) {
      this.props.database.ref('order/'+this.state.key).on('value',(snap)=>{
        if (snap.val()!=null) {
          if (snap.val().courier!==0) {
            this.getCourier(snap.val().courier)
            this.state.order=snap.val()
            this.state.loader.order=false
            this.setState(this.state)
            setTimeout(()=> {instance.close()}, 2000)
          }
        }
      })
    }
  }
  getCourier(id){
    this.props.database.ref('courier/'+id).on('value',(snapshot)=>{
      if(snapshot.val()!==null) {
        this.state.courier={mail:snapshot.val().mail,name:snapshot.val().name,phone:snapshot.val().phone}
        this.setState(this.state)
      }
    })
  }
  getUser(){
    this.props.database.ref('user/')
    .push(this.state.order)
    .then((snap)=>{
      this.setState({key:snap.key})
      this.watchOrder()
    })
  }
  setUser=(user)=>{
    this.setState({user:user})
    this.state.order.user=user.phone
    var instance = M.Modal.getInstance(document.getElementById("preorder"))
    instance.close()
    M.Modal.getInstance(document.getElementById("orderConfirmation")).open()
    this.writeOrderData()
  }
  showSuggets(){
    this.setState({suggets:!this.state.suggets})
  }
  countDown(){
    this.interval = setInterval(() => {
      if (this.state.count>0) {
        this.setState({count:this.state.count- 1})
      }else {
        this.showSuggets()
        clearInterval(this.interval)
      }
    }, 1000)
  }
  updatePaymentOffer(offer){
    this.state.order.paymentoffer=parseInt(this.state.order.paymentoffer)+offer
    this.state.order.paymentoffer=this.state.order.paymentoffer.toString()
    this.state.undo=true
    this.props.database.ref('order/'+this.state.key).set(this.state.order)
    this.setState(this.state)
  }
  undoPaymentOffer(){
    this.state.order.paymentoffer=localStorage.getItem('paymentoffer')
    this.state.undo=false
    this.props.database.ref('order/'+this.state.key).set(this.state.order)
    this.setState(this.state)
  }
  currencyFormat(price){
    return price.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }
  render(){
    return(
      <div className="row">
        <h5 className="poppins center">Resumen del pedido:</h5>
        <div className="col s12 l6">
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
                      <img className="responsive-img shadow-road-from" src={from} alt={this.state.order.city}/>
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
                      <img className="responsive-img shadow-type" src={getImg(this.state.order.package)} alt={this.state.order.package}/>
                    </div>
                  </div>
                  <div className="col s10">
                    <h5 className="no-margin">{this.state.order.package}</h5>
                    <span className="grey-text text-darken-2">Paquete {this.state.order.package==='Caja'?'maximo de 50x50x50 cm':''}</span>
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
          <div className="row no-margin">
            <div className="col s12">
              <iframe className="col s12" height="300" src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d37572.214214641725!2d-74.07964210190573!3d4.636554128128039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x8e3f99a3b6aa0d79%3A0xfae1b01aa8483257!2zQ2wuIDE5ICM0LTUyLCBCb2dvdMOh!3m2!1d4.6041943!2d-74.0694958!4m5!1s0x8e3f9af5539e0589%3A0x58f8536449f01c72!2sCentro%20Comercial%20Andino%2C%20Cra.%2011%20%23%2382-71%2C%20Bogot%C3%A1!3m2!1d4.6668522!2d-74.0531033!5e0!3m2!1ses!2sco!4v1595956226216!5m2!1ses!2sco" aria-hidden="false" ></iframe>
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
                      <h5 className="no-margin">{this.currencyFormat(this.state.order.paymentoffer)}</h5>
                      <span className="grey-text text-darken-2">{this.state.order.pay}</span>
                    </div>
                  </div>
                  {
                    this.state.order.courier==0?
                    <div className="row">
                      <div className="col s12">
                        <a onClick={()=>this.writeOrderData()} className="hide col s12 btn primary waves-effect waves-light">Confirmar servicio</a>
                        <a data-target="preorder" className="col s12 btn primary modal-trigger waves-effect waves-light">Confirmar servicio</a>
                      </div>
                    </div>
                    :
                    null
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <button onClick={()=>this.takeOrder()} className="btn primary waves-effect col s12">Tomar</button>
          </div>
        </div>
        <div id="preorder" className="modal bottom-sheet modal-confirmation">
          {
            this.state.loader.user?
            <div className="modal-content">
              <h4>Espere un momento</h4>
              <p>Un mensajero tomara su pedido en un momento</p>
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
            </div>
            :
            <div className="modal-content">
              <h4>Por favor confirmenos sus datos de contacto</h4>
              <UserForm setUser={this.setUser} firebase={this.props.database}/>
            </div>
          }
        </div>
        <div id="orderConfirmation" className="modal bottom-sheet modal-confirmation">
          {
            this.state.loader.order?
            <div className="modal-content">
              <h4>Espere un momento</h4>
              <p>Un mensajero tomara su pedido en un momento</p>
              {
                this.state.suggets?
                <div>
                  <h5>¿Nadie toma el pedido?</h5>
                  <p>Suba un poco la oferta para este pedido para que un mensajero la tome</p>
                  <div className="row">
                    <div className="col s12">
                      <div className="card">
                        <div className="card-content">
                          <div className="row">
                            <div className="col s12 l1">
                              <div className="circle">
                                <img className="responsive-img shadow-city" src={getImg(this.state.order.pay)} alt={this.state.order.paymentoffer}/>
                              </div>
                            </div>
                            <div className="col s12 l2">
                              <h5 className="no-margin">{this.currencyFormat(this.state.order.paymentoffer)}</h5>
                              <span className="grey-text text-darken-2">{this.state.order.pay}</span>
                            </div>
                            <div className="col s12 l6">
                              {this.state.undo?<button className="btn-flat" onClick={()=>this.undoPaymentOffer()}>deshacer</button>:null}
                              <button className="btn primary" onClick={()=>this.updatePaymentOffer(1000)}>$1.000</button>
                              <button className="btn primary" onClick={()=>this.updatePaymentOffer(2000)}>$2.000</button>
                              <button className="btn primary" onClick={()=>this.updatePaymentOffer(5000)}>$5.000</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>:
                null
              }
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
            </div>
            :
            <div className="modal-content">
              <h4>¡Listo! 🛵</h4>
              <p>Tu pedido fue tomado por el mensajero <b>{this.state.courier.name}</b></p>
            </div>
          }
          <div className="modal-footer">
            <a href="#!" className="hide modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(OrderResume)
