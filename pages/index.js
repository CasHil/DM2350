import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Auth from "../components/Auth";
import CurrentQuestion from "../components/CurrentQuestion/CurrentQuestion";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Divider } from "@mui/material";
import Head from "next/head";
import Intro from "../components/Intro";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Perceptual preferences for groove patterns in jazz</title>
        <meta
          name="description"
          content="Experiment for DM2350 at the Royal Institute of Technology in Stockholm"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className={styles.container} style={{ padding: "50px 0 100px 0" }}>
          <h1>Perceptual preferences for groove patterns in jazz</h1>
          <Divider />
          <Auth />
          <CurrentQuestion />
        </div>
      </ThemeProvider>
    </>
  );
}
