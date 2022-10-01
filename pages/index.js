import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import styles from "../styles/Home.module.css";
import Auth from "../components/Auth";
import CurrentQuestion from "../components/CurrentQuestion";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Divider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className={styles.container} style={{ padding: "50px 0 100px 0" }}>
        <h1>Perceptual preferences for groove patterns in jazz</h1>
        <p>
          Thank you for participating in our study about perceptual preferences
          in jazz. Our goal in this research is to find out the preferences of
          listeners, varying specific aspects of the song that you will be
          listening to.
        </p>
        <Divider />
        <Auth />
        <CurrentQuestion />
      </div>
    </ThemeProvider>
  );
}
