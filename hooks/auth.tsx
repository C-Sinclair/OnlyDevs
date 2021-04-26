import { User } from "@supabase/gotrue-js";
import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext<User | null>(null)

type AuthProviderProps = {
  children?: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log({ event, session })
      setUser(supabase.auth.user())
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
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const user = useContext(AuthContext)
  return {
    loggedIn: !!user,
    ...user,
  }
}

export async function loginWithGithub() {
  supabase.auth.signIn({ provider: 'github' }, { redirectTo: `/setup` })
}