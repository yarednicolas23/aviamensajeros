import React from 'react'
import { withRouter } from "react-router"
import moment from 'moment'

import M from 'materialize-css'
import UserForm from './UserForm'

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


class InCourse extends React.Component{
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
    const id = this.props.match.params.order
    if (id!=null) {
      this.setState({key:id})
      this.watchOrder(id)
    }
  }

  writeOrderData() {
    this.state.order.creation=new Date().toString()
    this.props.database.ref('order/').push(this.state.order).then((snap)=>{this.setState({key:snap.key});this.goToOrder(snap.key);this.watchOrder()})
  }
  goToOrder = e => {
    this.props.history.push("/resume/"+e);
  };
  watchOrder(id){
    this.countDown()
    if (this.state.key!=null) {
      var instance = M.Modal.getInstance(document.getElementById('orderConfirmation'))
      instance.open()
      this.props.database.ref('order/'+id).on('value',(snap)=>{
        if (snap.val()!=null) {
          if (snap.val().courier!==0) {
            this.state.order=snap.val()
            this.setState(this.state)
            if (snap.val().courier!=null) {
              this.getCourier(snap.val().courier)
              this.state.loader.order=false
              setTimeout(()=> {instance.close()}, 2000)
            }
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
        <div className="col s12">
        <h5 className="poppins">Pedido en curso:</h5>
        <div className="col s12 l6">
          <div className="row">
            <div className="col s12">
              <div className="card">
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
            <div className="col s12">
              <div className="card">
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col s12 l6">
          {
            this.state.order.courier!==0?
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
                      <div className="col s4 l6">
                        <h5 className="no-margin">{this.state.courier.name}</h5>
                        <span className="grey-text text-darken-2">Mensajero</span>
                      </div>
                      <div className="col s6 l4">
                        <a href={"tel:"+this.state.user.phone} className="col s6"><img className="responsive-img shadow-action" src={phone} alt={"foto del mensajero"}/></a>
                        <a href={"https://api.whatsapp.com/send?phone="+this.state.user.phone+"&text=Hola "+this.state.user.name+""} className="col s6"><img className="responsive-img shadow-action" src={whats} alt={"foto del mensajero"}/></a>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s2">
                        <div className="circle">
                          <img className="responsive-img shadow-road-from" src={clock} alt={"foto del mensajero"}/>
                        </div>
                      </div>
                      <div className="col s8">
                        <h5 className="no-margin">{moment(this.state.order.creation).format('hh:mm A') }</h5>
                        <span className="grey-text text-darken-2">Hora del pedido</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s2">
                        <div className="circle">
                          <img className="responsive-img shadow-road-from" src={shield} alt={"foto del mensajero"}/>
                        </div>
                      </div>
                      <div className="col s8">
                        <h5 className="no-margin">{moment(this.state.order.tracking.dateCourierTakeOrder).format('hh:mm A') }</h5>
                        <span className="grey-text text-darken-2">Hora de tomado por mensajero</span>
                      </div>
                      <div className="col s2">
                        <div className={this.state.order.step>=1?"btn-floating btn-flat green accent-2":"btn-floating btn-flat grey lighten-4"}>
                          <i className={this.state.order.step>=1?"material-icons green-text":"material-icons grey-text"}>check</i>
                        </div>
                      </div>
                    </div>
                    <div className={this.state.order.step>=2?"row":"row opacity-1"}>
                      <div className="col s2">
                        <div className="circle">
                          <img className="responsive-img shadow-road-from" src={timer} alt={"foto del mensajero"}/>
                        </div>
                      </div>
                      <div className="col s8">
                        <h5 className="no-margin">{moment(this.state.order.tracking.dateCourierTakeOrder).add(20, 'minutes').format('hh:mm A') }</h5>
                        <span className="grey-text text-darken-2">Hora estimada de llegada del mensajero</span>
                      </div>
                      <div className="col s2">
                        <div className={this.state.order.step>=2?"btn-floating btn-flat green accent-2":"btn-floating btn-flat grey lighten-4"}>
                          <i className={this.state.order.step>=2?"material-icons green-text":"material-icons grey-text"}>check</i>
                        </div>
                      </div>
                    </div>
                    <div className={this.state.order.step>=3?"row":"row opacity-2"}>
                      <div className="col s2">
                        <div className="circle">
                          <img className="responsive-img shadow-road-from" src={motorcycle} alt={"mensajero en camino"}/>
                        </div>
                      </div>
                      <div className="col s8">
                        <h5 className="no-margin">{moment(this.state.order.tracking.dateCourierTakeOrder).add(30, 'minutes').format('hh:mm A') }</h5>
                        <span className="grey-text text-darken-2">Pedido en curso</span>
                      </div>
                      <div className="col s2">
                        <div className={this.state.order.step>=3?"btn-floating btn-flat green accent-2":"btn-floating btn-flat grey lighten-4"}>
                          <i className={this.state.order.step>=3?"material-icons green-text":"material-icons grey-text"}>check</i>
                        </div>
                      </div>
                    </div>
                    <div className={this.state.order.step>=4?"row":"row opacity-3"}>
                      <div className="col s2">
                        <div className="circle">
                          <img className="responsive-img shadow-yellow" src={packageDone} alt={"foto del mensajero"}/>
                        </div>
                      </div>
                      <div className="col s6">
                        <h5 className="no-margin">{moment(this.state.order.tracking.dateCourierTakeOrder).add(50, 'minutes').format('hh:mm A') }</h5>
                        <span className="grey-text text-darken-2">Tiempo de entrega</span>
                      </div>
                    </div>
                    <div className={this.state.order.step>=4?"row":"row opacity-3"}>
                      <div className={this.state.order.step>=4?"btn green accent-2 shadow-green waves-effect col s12":"btn primary disabled col s12"}>
                        Pague al mensajero $ {this.currencyFormat(this.state.order.paymentoffer)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :null
          }
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
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
              <h4>¡Listo!</h4>
              <p>Tu pedido fue tomado por el mensajero:</p>
              <h5><b>{this.state.courier.name}</b></h5>
            </div>
          }
          <div className="modal-footer">
            <a href="#!" className="hide modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default withRouter(InCourse)
