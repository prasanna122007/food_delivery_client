import React, { createContext, useContext, useEffect, useState } from 'react'
import { placeOrder } from '../services/api'

const CartContext = createContext(null)

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]')
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const add = (food) => {
    const fid = food.id || food._id || food._id?.toString()
    setItems((prev) => {
      const found = prev.find((p) => p.id === fid)
      if (found) {
        return prev.map((p) => (p.id === fid ? { ...p, qty: p.qty + 1 } : p))
      }
      // normalize stored item to have an `id` field
      const item = {
        id: fid,
        name: food.name,
        price: food.price,
        description: food.description,
        image: food.image,
        qty: 1,
      }
      return [...prev, item]
    })
  }

  const remove = (id) => setItems((prev) => prev.filter((p) => p.id !== id))

  const clear = () => setItems([])

  const updateQty = (id, qty) =>
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)))

  const total = items.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0)

  const doPlaceOrder = async (customer = {}) => {
    const payload = {
      items: items.map(({ id, qty }) => ({ id, qty })),
      customer,
    }
    const res = await placeOrder(payload)
    clear()
    return res
  }

  return (
    <CartContext.Provider value={{ items, add, remove, clear, updateQty, total, doPlaceOrder }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
