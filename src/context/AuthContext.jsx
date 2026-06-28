import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser, signOut as amplifySignOut, fetchAuthSession } from 'aws-amplify/auth'
import { Hub } from 'aws-amplify/utils'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isInstructor, setIsInstructor] = useState(false)

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      const session = await fetchAuthSession()
      const groups = session.tokens?.idToken?.payload?.['cognito:groups'] || []
      setUser(currentUser)
      setIsInstructor(groups.includes('instructors') || groups.includes('admins'))
    } catch {
      setUser(null)
      setIsInstructor(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkUser()
    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      if (payload.event === 'signedIn') checkUser()
      if (payload.event === 'signedOut') { setUser(null); setIsInstructor(false) }
    })
    return unsubscribe
  }, [])

  const signOut = async () => {
    await amplifySignOut()
    setUser(null)
    setIsInstructor(false)
  }

  return (
    <AuthContext.Provider value={{ user, loading, isInstructor, signOut, refreshUser: checkUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
