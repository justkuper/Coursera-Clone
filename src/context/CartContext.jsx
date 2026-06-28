import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext(null)
const CART_KEY = 'learnhub_cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(CART_KEY)) || [] }
    catch { return [] }
  })

  useEffect(() => {
    sessionStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = (course) => {
    if (items.find((i) => i.id === course.id)) { toast('Already in cart', { icon: 'ℹ️' }); return }
    setItems((prev) => [...prev, course])
    toast.success(`"${course.title.slice(0, 30)}..." added to cart`)
  }

  const removeFromCart = (courseId) => setItems((prev) => prev.filter((i) => i.id !== courseId))
  const clearCart = () => setItems([])
  const isInCart = (courseId) => items.some((i) => i.id === courseId)
  const totalItems = items.length
  const subtotal = items.reduce((sum, i) => sum + i.price, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, isInCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
