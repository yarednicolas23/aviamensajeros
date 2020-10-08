const express = require("express")
var cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

// Firebase App (the core Firebase SDK) is always required and must be listed first
//import * as firebase from "firebase/app"
const firebase=require("firebase/app")
const database =require("firebase/database")
// Add the Firebase products that you want to use
//import "firebase/auth"
//import "firebase/database"

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCSLYO-Jw0oJTlsxbX4GykyE-j2hIKhg6s",
  authDomain: "aviamens.firebaseapp.com",
  databaseURL: "https://aviamens.firebaseio.com",
  projectId: "aviamens",
  storageBucket: "aviamens.appspot.com",
  messagingSenderId: "16851261794",
  appId: "1:16851261794:web:17b85b4ddbb16da6d4343b",
  measurementId: "G-DGS5PWGQYV"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
//var database = firebase.database()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Saludos desde express')
})

app.post('/courier/login', function (req, res) {
  firebase.database().ref('/courier/'+req.body.phone).once('value').then((snapshot)=> {
    res.send(snapshot.val())
  })
})

app.post('/register', function (request, response) {
  firebase.database().ref('user/'+request.body.user.phone).set(request.body.user)

  const urlconfirmation = 'https://aviamens.web.app/confirmation/'
  var mailcontent = ''+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#d6d6d5" class="" style="background-color: #efefef;border:0;border-collapse:collapse;border-spacing:0;">'+
    '<tbody><tr><td align="center" style="display:block">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:0; border-collapse:collapse; border-spacing:0; max-width:700px">'+
    '<tbody><tr><td style="background-color:#1A5CFF;">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="border:none; border-collapse:collapse; border-spacing:0; width:100%">'+
    '<tbody><tr><td class="x_outsidegutter" align="left" style="padding:0 14px 0 14px">'+
    '<table border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0; width:100%">'+
    '<tbody><tr><td>'+
    '<table border="0" cellpadding="0" cellspacing="0" class="x_t12of12" align="left" style="border:none; border-collapse:collapse; border-spacing:0; max-width:672px; width:100%">'+
    '<tbody><tr><td style="padding-left:12px; padding-right:12px">'+
    '<table border="0" cellpadding="0" cellspacing="0" style="border:0;border-collapse:collapse;border-spacing:0;width:100%;margin-top: 40px;margin-bottom: 40px;">'+
    '<tbody><tr><td align="center" valign="middle" style="direction:ltr; margin:0; padding:0; width:12%">'+
    '<table border="0" cellpadding="0" cellspacing="0" style="border:0; border-collapse:collapse; border-spacing:0; width:100%">'+
    '<tbody><tr><td style="direction:ltr">'+
    '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAAAoCAYAAAAYEYTzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACCFJREFUeNrsXO1x4zgMVTL5f9oKTltBlAoiVxCngrUriF1B5AqcVGCnAjsV2KnA2gqsVBBfBT5yD9rjcgESlKhkM8ab0eRLAh8BEAQgOkkiEAgEAoFAIBAIBAKBQCAQCAQBOPssRI/HY6q+5D9In51txXQC8ZHTNXShrrfj/9irKxfNCAwfGYqPnI6xTUM32IhmBOIjp2lsFKIZgZFBio9I9BcIxEdO0di51IcCRpYgPtIRZ5/N6D9ISwdZgPuHvGXoMyAoBWfqS/ZZFdw3f8MBayW/5mQ66kvahUsjA36slKxDrCysC7cmWHfhZchg6TP2RhPbT7ROlbyK66Nd5m3JOfjGDRVeQsplYwEDJ64Gjvp2hz3rGG9E9IRS+PsG+VvZF39DBlqTAl9b/psp3yp3VogsraNRQDq8InS0B66p41l0rg5uG2uBu+y2I3ix5ufgsG+eJ2xRWnJCfaQ1d49vZOAHZFPTuAfre6B+1Kcc547nUJI5UO4JCBPsOce4mEOsQo0di7/L6KaxXfI9gY4VKEHG/MjDG7aIHR14Dre5g9eCyavNRmAH8WgBAXxkw+S+wxaUwzfsXteR+Wwb/edEICD9sY9gYA7iCggZ8dwwoEM8CjF2TP4tDIfJn3Q1fMCiM1EwAwIXww5BipwfMxi47BUcEAJ9xBw7ZfjGHuPZUW9oQIX19RY4B1amcG58P2kaMgykzsbEf3UQVotdI5MbIvJ0/bkOjGnR+EeAlj8P4Y6UGjogjlqMvaLKh5aYI32TCXKfttdM9w988wMZ80B9xppL3sKWK8Z9mYsn+PmkBecRUr7cIWPpNfegriWsH3sO9+yAAAa6I+7Rhr5V1wAMzm0WPSG/wzKEG2zMkKZUT/xdeAB5AzCAC3qBjOHeMRguYejmnpjL1zMAyMOMzw0kM+D1lZD1w9GtlBNbUEtF51ZdpbquQK5rfhNi8ejxp8DplthUujSYR4QOvoA+vxDciwivMOcMX3pgPotxGagpTNU1BnseGGuPjl5EqjEJqV2Q9AxDbt2396WpvnSwJ/5lQAo9cdSgKaKXvadngs1nH1CH7xglQ0noxqlHQt7GnCektKV1FZ6m8x7LbBxlUxnoI3Nuf4MYc84sJxdgv6KZs0Ovo4BSauiZ6xCR84sNOLHgwhFx9CuQB6QcqJTwmS/l0zu8um+NRKaiSSshONi1jX5lElouROdPoMa46XGIPsCjnemAXp6QDCD1zGfL6fw7nv9tVyd0swUbUdywkkDfvwd7v2iuOlsI5DfDskK94xFlZRLBR74TOj201OlY8V0yM+Mau1f/TnG6Q8a7NsroCrGRLhX1759B/8s2Smp6CJeYA3rS4LZlwzePotpMpC/+CVKnUdgG3O9Lhf/Gakl1bZBr4UiRfX0eDC++QE+k1U2psoDgsIPMyc6Q8hY6ifFOPSNScUynE+bz3gXusKdrvs+egDRzBC290WyM145Fm4CARd9Xx3OsOhx2U/ve3HDWG2YQadN06sz/A5FFkNFb4xR2/xljR55DcMh9vDwHcg5/gE59+qwDx37toP8D9BwqD98RBIcFV/aFIwW5jORsa6SZU0BqmiNRts1u0Cf/jwA2n61v97bT/z4J6qCgbPgAtr12NK1ScMorWPQVkdG4TvWlkXSaI9kod2HWke3p8s+/mPa9ggzgBvRPBT3dT9Cl+JQbEP4hOqsp0e2/CVDGExIQbggjP7VUeJ/8PwLYfCpPXf7uAN0+wJUYzjmy7NvsViX0UBKizq6QQJEii6kNMD94btGvaoNXou9CYcgt5eCotb6mkHkXUJbb8nUZ5A0I58YujkXlBVIDjpKA96lAuEYmfB2pf9Ar/w/Cmojy2BuLFXSdzau3wAHdenu8orE17EJj5NFrz/zukUNVKdT0MYDV5XdYpoLMb0MdqmMC6xekxKGjBbHTrx38Fk3ZpfsY6hoQwbVA+lIlXNnPDAG6yzVCZAg1/xp2rcsk5H3mr5OZeKJg1faDHe/A/713XqzbrxfHDt6Q1PDzHbHTzHqmWCDOfWvYL/Ps0M+EHTZgq++QNg8j9VOazebeylwK+AzCI/DL4J4M4b6NbM8myOdGsLpJ8LcZlVFO1ZjNlZzvzVs1CKSpxwYLK3O/g77ET4HDjkdcj45dJWc8PnE8zzmWGpW/6wMsARwL4t7CJ7vDkWOWHMc8Ss/7/Mw1tuNo8MgaZ9fRXGULHykjjRXkGwFrgHscfeH4oNuGOGeztxq+R+RanRtRbB2QslehEZLRlFl33FV74/9BWcKWSL1987rtmVft4FU4djjbNtTJyN7sBT2Y0LJ0GaN3A2tg3OLRMfKR7Cmhk6aHgGUHU0aTNj23SI8T+vikaZxBi4k9uoJBjM+/98z/I4LCEhY4Z+HogDiI9f8RIvJC9Q0LZMDYKMZE/d/FR7gl1Qzuj6k3zpyb0mBAHF5qXjuuA4LK2rIJZruXC2Qw3a18NjqVmdEYeWoIQk0U2keguvtPDKfCFJb0yL9G6sYqkCO1YA5c2dqQwHVk1Jip8UwF89oGjBU67zqQVw28nl0n5qC2vjJkFBYHvSBrKDe2HPtzMwUlcwl1c27V5Fvg/ujYpEJ9w878vsKcGr1lIXozgsItlBPfQE7OnEcTUOYw9wNs2L01owWCd0XoP0gR4DgXFQgEAgkIAoHgN1yICgSfuEwooAa+TvDzGLVoSSA4nYDgO1eQiZakZBAINJbv+a/cJSAIBH8u9CvuqahBegiC04LOALbGz/oTgeu+P/otEAgEAoFAcFr4V4ABAKkl4kK88X+VAAAAAElFTkSuQmCC" width="75" height="" border="0" class="x_bitTop" id="OWATemporaryImageDivContainer648655" style="clear:both;display:block;height:auto;max-height: 95px;max-width: 125px;min-width: 115px;outline:0;text-decoration:none;width:100%;">'+
    '</td></tr></tbody></table></td>'+
    '<td align="center" style="padding:0; margin:0; direction:ltr; text-align:left; width:88%">'+
    '&nbsp; </td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="x_tron" style="border:0;border-collapse:collapse;border-spacing:0;margin:auto;max-width:700px;"><tbody><tr><td align="center">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" class="x_basetable" style="background-color:#fff; border:0; border-collapse:collapse; border-spacing:0; margin:auto">'+
    '<tbody><tr><td align="center">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="x_basetable" style="border:0; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td align="center" style="background-color:#ffffff">'+
    '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="x_basetable" style="border:0; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td>'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="x_basetable" style="border:0; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td>'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:0; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td>'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0; width:100%">'+
    '<tbody><tr><td width="700" valign="top" align="center" style="width:700px; height:auto"><div>'+
    '<table border="0" cellpadding="0" cellspacing="0" class="x_t10of12" align="center" style="border:none; border-collapse:collapse; border-spacing:0; max-width:560px; width:100%">'+
    '<tbody><tr><td style="padding-left:12px; padding-right:12px; direction:ltr; text-align:left">'+
    '<table border="0" cellpadding="0" cellspacing="0" width="100%" align="left" style="border:none; border-collapse:collapse; border-spacing:0; table-layout:fixed; width:100%">'+
    '<tbody><tr><td style="direction:ltr; text-align:left">'+
    '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="" style="border:none; border-collapse:collapse; border-spacing:0; width:100%">'+
    '<tbody><tr>'+
    '<td class="x_lhreset" style  ="font-size:0px;line-height:1px;padding-bottom: 10px;direction:ltr;text-align:left;">'+
    '&nbsp;</td></tr></tbody></table>'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="border:none; border-collapse:collapse; border-spacing:0; width:100%">'+
    '<tbody><tr>'+
    '<td class="x_outsidegutter" align="left" style="padding:0px 14px 0px 14px; direction:ltr; text-align:left">'+
    '<table border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0; width:100%">'+
    '<tbody><tr>'+
    '<td style="direction:ltr; text-align:left">'+
    '<table border="0" cellpadding="0" cellspacing="0" class="x_t8of12" align="center" style="border:none; border-collapse:collapse; border-spacing:0; max-width:460px; width:100%">'+
    '<tbody><tr>'+
    '<td style="padding-left:12px; padding-right:12px; direction:ltr; text-align:left">'+
    '<table border="0" cellpadding="0" cellspacing="0" width="100%" align="left" style="border:none; border-collapse:collapse; border-spacing:0; table-layout:fixed; width:100%">'+
    '<tbody><tr><td style="padding-top:30px">&nbsp;</td></tr><tr>'+
    '<td class="x_h2 x_h2-p1" style="color:rgb(0,0,0); font-family:ClanPro-Book,HelveticaNeue-Light,Helvetica Neue Light,Helvetica,Arial,sans-serif; font-size:24px; line-height:30px; padding-top:20px; padding-bottom:22px; direction:ltr; text-align:left">'+
    request.body.user.name+', gracias por registrarse en aviamensajeros. </td> '+
    '</tr><tr>'+
    '<td class="x_p1 x_p1-p1" style="color:rgb(89,89,89); font-family:ClanPro-Book,HelveticaNeue-Light,Helvetica Neue Light,Helvetica,Arial,sans-serif; font-size:16px; line-height:28px; padding-bottom:28px; direction:ltr; text-align:left">'+
    '<p>Confirma tu cuenta y asigna una clave para poder ver el historial de tus pedidos,</p>'+
    '<p>para confirmar con tu correo da click en: <a href="'+urlconfirmation+request.body.user.phone+'">aquí</a>,</p>'+
    '</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>'+
    '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="" style="border:none; border-collapse:collapse; border-spacing:0; width:100%">'+
    '<tbody><tr>'+
    '<td class="x_lhreset" style="font-size:0px; line-height:1px; padding-bottom:70px; direction:ltr; text-align:left">'+
    '&nbsp;</td></tr></tbody></table></td></tr><tr><td style="direction:ltr; text-align:left"></td>'+
    '</tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></td></tr>'+
    '</tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>'+
    '</td></tr></tbody></table></td></tr></tbody></table>'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="x_tron" style="border:0; border-collapse:collapse; border-spacing:0; margin:auto; max-width:700px; background-color:#ffffff">'+
    '<tbody><tr><td style="display:block">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" bgcolor="#ffffff" style="border:none; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td align="center" style="background-color: #1A5CFF;text-align:left;">'+
    '<table border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td align="center" style="text-align:left">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0; max-width:700px">'+
    '<tbody><tr><td style="padding:0px 26px; text-align:left">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0; max-width:648px; table-layout:fixed">'+
    '<tbody><tr><td style="font-size:0px; line-height:0px; padding-top:20px; text-align:left">&nbsp;</td>'+
    '</tr><tr><td style="text-align:left">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td align="left" style="text-align: center;"><h1></h1>'+
    '<table border="0" cellpadding="0" cellspacing="0" class="x_basetable" align="left" style="border:none;border-collapse:collapse;border-spacing:0;max-width: 100%;text-align: center;">'+
    '<tbody><tr><td style="padding-top:40px;text-align: center;">'+
    '<table border="0" cellpadding="0" cellspacing="0" class="x_basetable" align="left" style="border:none;border-collapse:collapse;border-spacing:0;">'+
    '<tbody><tr>'+
    '<td align="left" style="text-align:left"><img src="data:image/png;base64,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" width="90" height="20" alt="" class="" id="OWATemporaryImageDivContainer1735528" style="border:none; clear:both; display:block; max-width:100%; outline:none; text-decoration:none; width:auto"> </td>'+
    '</tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr>'+
    '<td style="padding:40px 0px 0px 0px; text-align:left">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0"><tbody><tr>'+
    '<td height="1" style="font-size:0px;line-height:0px;background: rgb(255, 255, 255);text-align:left;">'+
    '&nbsp;</td></tr></tbody></table></td></tr><tr><td style="text-align:left">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td valign="top" style="vertical-align:top; text-align:left">'+
    '<table border="0" cellpadding="0" cellspacing="0" class="x_basetable" align="left" style="border:none; border-collapse:collapse; border-spacing:0; max-width:313px; table-layout:fixed">'+
    '<tbody><tr><td style="text-align:left">'+
    '<table border="0" cellpadding="0" cellspacing="0" class="x_basetable" width="100%" align="left" style="border:none; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td align="left" style="text-align:left"><table border="0" cellpadding="0" cellspacing="0" class="x_basetable" align="left" style="border:none; border-collapse:collapse; border-spacing:0; max-width:205px; table-layout:fixed"><tbody><tr>'+
    '<td class="x_p3" align="left" style="color: rgb(255, 255, 255);font-family:ClanPro-Medium,Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;padding-top:30px;text-align:left;">'+
    '    © 2020 aviamensajeros'+
    '    <br>'+
    '    Calle 19 #4-62'+
    '    <br>'+
    '    Teléfono: 3817111'+
    '    <br>'+
    '    Bogotá D.C, Colombia'+
    '    <br>'+
    '    <a href="'+urlconfirmation+'" style="color:white">'+urlconfirmation+'</a>'+
    '    <br>'+
    '<a href="'+urlconfirmation+'" style="color:white">'+
    ''+urlconfirmation+'</a>'+
    '</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr>'+
    '<td style="font-size:0px; line-height:0px; padding-top:60px; text-align:left">&nbsp;</td>'+
    '</tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>'+
    '</td></tr></tbody></table></td></tr></tbody></table>';
  var http = require("https")

  var options = {
    "method": "POST",
    "hostname": "api.sendgrid.com",
    "port": null,
    "path": "/v3/mail/send",
    "headers": {
      "authorization": "Bearer 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",
      "content-type": "application/json"
    }
  };
  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk)
    })

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString())
    })
  })

  req.write(
    JSON.stringify(
      {
        "personalizations":[{ "to": [{"email":request.body.user.mail}],"cc":[{"email":"yared.toro@aviatur.com"}], "subject": "Gracias por registrarte, confirma tu cuenta en aviamensajeros" }],
        "from":{ "email":"noreply@aviatur.com.co","name":"aviamensajeros." },
        "content": [
          {
            "type": "text/html",
            "value": mailcontent
          }
        ]
      }
  ))
  req.end()
  response.send("success")
})

app.post('/user/login', function (req, res) {
  try {
    firebase.database().ref('/user/'+req.body.phone).once('value').then((snapshot)=> {
      if (snapshot.val()==null) {
        res.send("")
      }
      if (req.body.password===snapshot.val().password) {
        var user = {mail:snapshot.val().mail,name:snapshot.val().name,phone:snapshot.val().phone}
        res.send(user)
      }else {
        res.send("password error")
      }
    })
  } catch (e) {
    res.send("error")
  } finally {

  }
})
app.post('/user/get/secret', async (req, res)=> {
  firebase.database().ref('/user/'+req.body.phone).once('value').then((snapshot)=> {
    if (snapshot.val()!=null) {
      var mail = snapshot.val().mail
      var name = snapshot.val().name
      var user = {
        email:mail.substring(0, mail.length - mail.length+4) + "*****@******.com",
        name:name.substring(0, mail.length - mail.length+4) + "************",
        account:{verified:snapshot.val().account.verified}
      }
      res.send(user)
    }
  })
})
app.post('/user/assignpassword', function (req, res) {
  var user = {}
  firebase.database().ref('/user/'+req.body.phone).once('value').then((snapshot)=> {
    if (snapshot.val()!=null) {
      user = snapshot.val()

      user.password = req.body.password
      user.account.verified = true
      firebase.database().ref('user/'+user.phone).set(user)
      res.send("success")
    }
  })
})
app.post('/user/resendverification', function (request, response) {
  const urlconfirmation = 'https://aviamens.web.app/confirmation/'
  var mailcontent = ''+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#d6d6d5" class="" style="background-color: #efefef;border:0;border-collapse:collapse;border-spacing:0;">'+
    '<tbody><tr><td align="center" style="display:block">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:0; border-collapse:collapse; border-spacing:0; max-width:700px">'+
    '<tbody><tr><td style="background-color:#1A5CFF;">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="border:none; border-collapse:collapse; border-spacing:0; width:100%">'+
    '<tbody><tr><td class="x_outsidegutter" align="left" style="padding:0 14px 0 14px">'+
    '<table border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0; width:100%">'+
    '<tbody><tr><td>'+
    '<table border="0" cellpadding="0" cellspacing="0" class="x_t12of12" align="left" style="border:none; border-collapse:collapse; border-spacing:0; max-width:672px; width:100%">'+
    '<tbody><tr><td style="padding-left:12px; padding-right:12px">'+
    '<table border="0" cellpadding="0" cellspacing="0" style="border:0;border-collapse:collapse;border-spacing:0;width:100%;margin-top: 40px;margin-bottom: 40px;">'+
    '<tbody><tr><td align="center" valign="middle" style="direction:ltr; margin:0; padding:0; width:12%">'+
    '<table border="0" cellpadding="0" cellspacing="0" style="border:0; border-collapse:collapse; border-spacing:0; width:100%">'+
    '<tbody><tr><td style="direction:ltr">'+
    '<img src="data:image/png;base64,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" width="75" height="" border="0" class="x_bitTop" id="OWATemporaryImageDivContainer648655" style="clear:both;display:block;height:auto;max-height: 95px;max-width: 125px;min-width: 115px;outline:0;text-decoration:none;width:100%;">'+
    '</td></tr></tbody></table></td>'+
    '<td align="center" style="padding:0; margin:0; direction:ltr; text-align:left; width:88%">'+
    '&nbsp; </td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="x_tron" style="border:0;border-collapse:collapse;border-spacing:0;margin:auto;max-width:700px;"><tbody><tr><td align="center">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" class="x_basetable" style="background-color:#fff; border:0; border-collapse:collapse; border-spacing:0; margin:auto">'+
    '<tbody><tr><td align="center">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="x_basetable" style="border:0; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td align="center" style="background-color:#ffffff">'+
    '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="x_basetable" style="border:0; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td>'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="x_basetable" style="border:0; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td>'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:0; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td>'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0; width:100%">'+
    '<tbody><tr><td width="700" valign="top" align="center" style="width:700px; height:auto"><div>'+
    '<table border="0" cellpadding="0" cellspacing="0" class="x_t10of12" align="center" style="border:none; border-collapse:collapse; border-spacing:0; max-width:560px; width:100%">'+
    '<tbody><tr><td style="padding-left:12px; padding-right:12px; direction:ltr; text-align:left">'+
    '<table border="0" cellpadding="0" cellspacing="0" width="100%" align="left" style="border:none; border-collapse:collapse; border-spacing:0; table-layout:fixed; width:100%">'+
    '<tbody><tr><td style="direction:ltr; text-align:left">'+
    '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="" style="border:none; border-collapse:collapse; border-spacing:0; width:100%">'+
    '<tbody><tr>'+
    '<td class="x_lhreset" style  ="font-size:0px;line-height:1px;padding-bottom: 10px;direction:ltr;text-align:left;">'+
    '&nbsp;</td></tr></tbody></table>'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="border:none; border-collapse:collapse; border-spacing:0; width:100%">'+
    '<tbody><tr>'+
    '<td class="x_outsidegutter" align="left" style="padding:0px 14px 0px 14px; direction:ltr; text-align:left">'+
    '<table border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0; width:100%">'+
    '<tbody><tr>'+
    '<td style="direction:ltr; text-align:left">'+
    '<table border="0" cellpadding="0" cellspacing="0" class="x_t8of12" align="center" style="border:none; border-collapse:collapse; border-spacing:0; max-width:460px; width:100%">'+
    '<tbody><tr>'+
    '<td style="padding-left:12px; padding-right:12px; direction:ltr; text-align:left">'+
    '<table border="0" cellpadding="0" cellspacing="0" width="100%" align="left" style="border:none; border-collapse:collapse; border-spacing:0; table-layout:fixed; width:100%">'+
    '<tbody><tr><td style="padding-top:30px">&nbsp;</td></tr><tr>'+
    '<td class="x_h2 x_h2-p1" style="color:rgb(0,0,0); font-family:ClanPro-Book,HelveticaNeue-Light,Helvetica Neue Light,Helvetica,Arial,sans-serif; font-size:24px; line-height:30px; padding-top:20px; padding-bottom:22px; direction:ltr; text-align:left">'+
    request.body.user.name+', gracias por registrarse en aviamensajeros. </td> '+
    '</tr><tr>'+
    '<td class="x_p1 x_p1-p1" style="color:rgb(89,89,89); font-family:ClanPro-Book,HelveticaNeue-Light,Helvetica Neue Light,Helvetica,Arial,sans-serif; font-size:16px; line-height:28px; padding-bottom:28px; direction:ltr; text-align:left">'+
    '<p>Confirma tu cuenta y asigna una clave para poder ver el historial de tus pedidos,</p>'+
    '<p>para confirmar con tu correo da click en: <a href="'+urlconfirmation+request.body.user.phone+'">aquí</a>,</p>'+
    '</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>'+
    '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="" style="border:none; border-collapse:collapse; border-spacing:0; width:100%">'+
    '<tbody><tr>'+
    '<td class="x_lhreset" style="font-size:0px; line-height:1px; padding-bottom:70px; direction:ltr; text-align:left">'+
    '&nbsp;</td></tr></tbody></table></td></tr><tr><td style="direction:ltr; text-align:left"></td>'+
    '</tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></td></tr>'+
    '</tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>'+
    '</td></tr></tbody></table></td></tr></tbody></table>'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="x_tron" style="border:0; border-collapse:collapse; border-spacing:0; margin:auto; max-width:700px; background-color:#ffffff">'+
    '<tbody><tr><td style="display:block">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" bgcolor="#ffffff" style="border:none; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td align="center" style="background-color: #1A5CFF;text-align:left;">'+
    '<table border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td align="center" style="text-align:left">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0; max-width:700px">'+
    '<tbody><tr><td style="padding:0px 26px; text-align:left">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0; max-width:648px; table-layout:fixed">'+
    '<tbody><tr><td style="font-size:0px; line-height:0px; padding-top:20px; text-align:left">&nbsp;</td>'+
    '</tr><tr><td style="text-align:left">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td align="left" style="text-align: center;"><h1></h1>'+
    '<table border="0" cellpadding="0" cellspacing="0" class="x_basetable" align="left" style="border:none;border-collapse:collapse;border-spacing:0;max-width: 100%;text-align: center;">'+
    '<tbody><tr><td style="padding-top:40px;text-align: center;">'+
    '<table border="0" cellpadding="0" cellspacing="0" class="x_basetable" align="left" style="border:none;border-collapse:collapse;border-spacing:0;">'+
    '<tbody><tr>'+
    '<td align="left" style="text-align:left"><img src="data:image/png;base64,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" width="90" height="20" alt="" class="" id="OWATemporaryImageDivContainer1735528" style="border:none; clear:both; display:block; max-width:100%; outline:none; text-decoration:none; width:auto"> </td>'+
    '</tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr>'+
    '<td style="padding:40px 0px 0px 0px; text-align:left">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0"><tbody><tr>'+
    '<td height="1" style="font-size:0px;line-height:0px;background: rgb(255, 255, 255);text-align:left;">'+
    '&nbsp;</td></tr></tbody></table></td></tr><tr><td style="text-align:left">'+
    '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:none; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td valign="top" style="vertical-align:top; text-align:left">'+
    '<table border="0" cellpadding="0" cellspacing="0" class="x_basetable" align="left" style="border:none; border-collapse:collapse; border-spacing:0; max-width:313px; table-layout:fixed">'+
    '<tbody><tr><td style="text-align:left">'+
    '<table border="0" cellpadding="0" cellspacing="0" class="x_basetable" width="100%" align="left" style="border:none; border-collapse:collapse; border-spacing:0">'+
    '<tbody><tr><td align="left" style="text-align:left"><table border="0" cellpadding="0" cellspacing="0" class="x_basetable" align="left" style="border:none; border-collapse:collapse; border-spacing:0; max-width:205px; table-layout:fixed"><tbody><tr>'+
    '<td class="x_p3" align="left" style="color: rgb(255, 255, 255);font-family:ClanPro-Medium,Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;padding-top:30px;text-align:left;">'+
    '    © 2020 aviamensajeros'+
    '    <br>'+
    '    Calle 19 #4-62'+
    '    <br>'+
    '    Teléfono: 3817111'+
    '    <br>'+
    '    Bogotá D.C, Colombia'+
    '    <br>'+
    '    <a href="'+urlconfirmation+'" style="color:white">'+urlconfirmation+'</a>'+
    '    <br>'+
    '<a href="'+urlconfirmation+'" style="color:white">'+
    ''+urlconfirmation+'</a>'+
    '</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr>'+
    '<td style="font-size:0px; line-height:0px; padding-top:60px; text-align:left">&nbsp;</td>'+
    '</tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>'+
    '</td></tr></tbody></table></td></tr></tbody></table>';
  var http = require("https")

  var options = {
    "method": "POST",
    "hostname": "api.sendgrid.com",
    "port": null,
    "path": "/v3/mail/send",
    "headers": {
      "authorization": "Bearer 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",
      "content-type": "application/json"
    }
  };
  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk)
    })

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString())
    })
  })

  req.write(
    JSON.stringify(
      {
        "personalizations":[{ "to": [{"email":request.body.user.mail}],"cc":[{"email":"yared.toro@aviatur.com"}], "subject": "Gracias por registrarte, confirma tu cuenta en aviamensajeros" }],
        "from":{ "email":"noreply@aviatur.com.co","name":"aviamensajeros." },
        "content": [
          {
            "type": "text/html",
            "value": mailcontent
          }
        ]
      }
  ))
  req.end()
  response.send("success")
})


app.listen(8080, () => {
 console.log("El servidor está inicializado en el puerto 8080")
})
