import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(false)

type AuthProviderProps = {
  children?: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setLoggedIn(!!supabase.auth.user())
      axios(`/api/auth`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        data: { event, session },
      })
    })
    return () => {
      authListener.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={loggedIn}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const loggedIn = useContext(AuthContext)
  return {
    loggedIn
  }
}

