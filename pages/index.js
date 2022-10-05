import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Auth from "../components/Auth";
import CurrentQuestion from "../components/CurrentQuestion/CurrentQuestion";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Divider } from "@mui/material";
import Head from "next/head";
import { Suspense } from "react";
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
          <p>
            Thank you for participating in our study about perceptual
            preferences in jazz! Our goal in this research is to find out the
            preferences of listeners, varying specific aspects (tempo, swing
            ratio and delays of the soloist) of the song that you will be
            listening to. It will take you about <b>10 minutes</b>. First you
            will be asked for some statistics about yourself. After that, you
            will listen to 25 samples, which you will have to rate on a scale
            from 1 to 5, where 1 means liking it the least and 5 means liking it
            the most. Similarly, you will be asked how groovy you find the
            sample. All of the samples are adapted from one piece of jazz. Note:
            All your data is completely anonymous and will be stored only for
            the duration of the course, after which it will be discarded.
          </p>
          <Divider />
          <Auth />
          <CurrentQuestion />
        </div>
      </ThemeProvider>
    </>
  );
}
