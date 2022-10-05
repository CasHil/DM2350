import React, { useState, useEffect } from "react";
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
} from "@mui/material";
import { supabase } from "../../../../../utils/supabaseClient";
import { getUuid } from "../../../../../utils/uuid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import ReactAudioPlayer from "react-audio-player";
import audioFiles from "../../../../../utils/audioFiles.json";
import { useCallback } from "react";
import {
  generateRemainingQuestions,
  getRemainingQuestions,
  removeRemainingQuestion,
} from "../../../../../utils/remainingQuestions";
import Grooviness from "./Grooviness";

export default function Enjoyment(props) {
  const [enjoyment, setEnjoyment] = useState(null);
  const [grooviness, setGrooviness] = useState(null);
  const [selectedRandomSample, setSelectedRandomSample] = useState();
  const [selectedRandomSampleFilename, setSelectedRandomSampleFilename] =
    useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  function handleChangeEnjoyment(e) {
    setEnjoyment(e.target.value);
  }

  function handleChangeGrooviness(e) {
    setGrooviness(e.target.value);
  }

  useEffect(() => {
    setLoading(true);
    console.log(loading);
    if (!getRemainingQuestions()) {
      generateRemainingQuestions();
    }
    const remainingQuestions = getRemainingQuestions();
    setProgress(25 - remainingQuestions.length);
    getSample();
    setLoading(false);
  }, []);

  async function handleClick() {
    setLoading(true);
    const userInsertions = {
      created_at: new Date(),
      person_id: getUuid(),
      answer_preference: enjoyment,
      answer_grooviness: grooviness,
      question_number: selectedRandomSample,
    };

    await supabase
      .from("answers")
      .insert([userInsertions], { returning: "minimal" });

    setProgress(progress + 1);
    removeRemainingQuestion(selectedRandomSample);
    setEnjoyment(null);
    setGrooviness(null);

    const remainingQuestions = getRemainingQuestions();
    if (remainingQuestions && remainingQuestions.length > 0) {
      getSample();
    }
    props.updateQuestion();
    setLoading(false);
  }

  const getSample = useCallback(() => {
    // Select random file
    const remainingQuestions = getRemainingQuestions();
    const randomNumber = (remainingQuestions.length * Math.random()) << 0;
    const sampleNumber = remainingQuestions[randomNumber];
    setSelectedRandomSample(sampleNumber);
    setSelectedRandomSampleFilename(audioFiles[sampleNumber]);
    return audioFiles[sampleNumber];
  }, []);

  return (
    <>
      {!loading ? (
        <ReactAudioPlayer
          src={selectedRandomSampleFilename}
          controls
          style={{ marginBottom: "1rem" }}
        />
      ) : (
        <CircularProgress />
      )}
      <Enjoyment onChange={handleChangeEnjoyment} />
      <Grooviness onChange={handleChangeGrooviness} />
      <Button
        onClick={handleClick}
        variant="contained"
        style={{ marginBottom: "1rem" }}
        disabled={enjoyment === null && grooviness === null}
      >
        Next
      </Button>
      <LinearProgress
        variant="determinate"
        value={(progress / 25) * 100}
        {...props}
      />
      <Typography variant="body2" color="text.secondary">{`${Math.round(
        (progress / 25) * 100
      )}%`}</Typography>
    </>
  );
}
