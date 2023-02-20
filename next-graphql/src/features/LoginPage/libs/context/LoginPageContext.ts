import { createContext, useContext } from "react"
import { ILoginPageContext } from "../types/ILoginPageContext"


const LoginPageContext = createContext<ILoginPageContext | null>(null)


const useLoginPageContext = () => {
  const data = useContext(LoginPageContext)

  if (!data) {
    throw new Error('No data from useLoginPageContext is it LoginPageContext')
  }

  return data
}

export { useLoginPageContext, LoginPageContext }
