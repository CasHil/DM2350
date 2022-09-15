import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import { v4 as uuidv4 } from 'uuid';

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const generateUuid = () => {
    const uuid = uuidv4();
    localStorage.setItem("uuid", uuid);
    return uuid;
  }
  async function insertUser() {
    const insertions = {
      created_at: new Date(),
      person_id: generateUuid()
    }
    const { error } = await supabase.from('users').insert([insertions], { returning: 'minimal' })
    console.log(error)
    if (error) alert(error)
  }
  
  useEffect(() => {
    try {
      setLoading(true)
      console.log(loading)
      if (typeof window !== 'undefined') {
        if (!window.localStorage.getItem("uuid")) {
          insertUser()
        }
        else {
          async function checkUser() {
            try {
              const { data, error } = await supabase.from('users').select().eq('person_id', window.localStorage.getItem("uuid"))
              console.log(data)
              if (error) throw error
              if (data.length === 0) {
                window.localStorage.removeItem("uuid")
                return false
              }
              return true
            }
            catch (err) {
              console.error(err)
            } 
          }
          if (!checkUser()) {
            insertUser()
          }
        }
        
          
      }
      
      
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + Next.js</h1>
      </div>
    </div>
  )
}