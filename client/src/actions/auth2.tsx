import React, { ChangeEvent, createContext, SyntheticEvent, useState } from 'react'
import { Options } from 'react-redux'

interface Option {
  label: string
  value: string
}

export enum AuthMethod {
  TOKEN = 'tkn',
  PASSWORD = 'pwd'
}

export interface AppData {
  auth: AuthMethod
}

interface Context {
  app: AppData,
  updateApp: (app: AppData) => void
}

export const defaultAppState: AppData = {
  auth: AuthMethod.PASSWORD
}

const defaultContext: Context = {
  app: defaultAppState,
  updateApp: () => {}
}

export const AppContext = createContext<Context>(defaultContext)

const Auth2 = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [inputValues, setInputValues] = useState({
    auth: AuthMethod.PASSWORD
  })

  const handleAuthChange = (e: SyntheticEvent<Element, Event>, option: Option) => {
    setInputValues({
      ...inputValues,
      auth: option.value as AuthMethod
    })
  }

  return (
   <select name="" id="">
      <option value={AuthMethod.PASSWORD}>Password</option>
      <option value={AuthMethod.TOKEN}>Token</option>
   </select>
  )
}

export default Auth2