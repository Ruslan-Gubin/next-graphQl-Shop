import { createContext, useContext } from "react";

interface IAdminLayoutContext {
  handleRouterLink: (href: string) => void
}

const AdminLayoutContext = createContext<IAdminLayoutContext | null>(null)

const useAdminLayoutContext = () => {
  const context = useContext(AdminLayoutContext)

  if (!context) {
    throw new Error('no context AdminLayoutContext in useAdminLayoutContext')
  }

  return context;
}

export { AdminLayoutContext, useAdminLayoutContext }