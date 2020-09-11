import React from 'react'
import { useCookies } from 'react-cookie'

export const SESSION = function(){
  const [user, setUser] = useCookies(['user'])
  if(user==null){
    return 'no user'
  }
}
