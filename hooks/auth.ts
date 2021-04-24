import axios from "axios";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useAuth() {
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

  return {
    loggedIn
  }
}