import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import styles from "../styles/Home.module.css";
import Auth from "../components/Auth";
import CurrentQuestion from "../components/CurrentQuestion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;
  }, []);

  return (
    <div className={styles.container} style={{ padding: "50px 0 100px 0" }}>
      <h1>Perceptual preferences for groove patterns in jazz</h1>
      <Auth />
      <CurrentQuestion />
    </div>
  );
}
