import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import styles from "../styles/Home.module.css"
import Auth from '../components/Auth'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    let mounted = true

    
  }, [])

  return (
    <div className={ styles.container } style={{ padding: '50px 0 100px 0' }}>
      <Auth />
      <h1>test</h1>
    </div>
  )
}