import React, { useState, useEffect } from "react";
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
} from "@mui/material";
import { supabase } from "../../../../utils/supabaseClient";
import { getUuid } from "../../../../utils/uuid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import ReactAudioPlayer from "react-audio-player";
import audioFiles from "../../../../utils/audioFiles.json";
import { useCallback } from "react";

export default function Preference(props) {
  const [preference, setPreference] = useState(1);
  const [selectedRandomSample, setSelectedRandomSample] = useState();
  const [selectedRandomSampleFilename, setSelectedRandomSampleFilename] =
    useState("");
  const [progress, setProgress] = useState(0);
  const [fileNames, setFileNames] = useState(audioFiles);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setPreference(e.target.value);
  }

  useEffect(() => {
    setLoading(true);
    getSample();
    setLoading(false);
  }, [getSample]);

  async function handleClick() {
    setLoading(true);
    const userInsertions = {
      created_at: new Date(),
      person_id: getUuid(),
      answer: preference,
      question_number: selectedRandomSample,
    };

    await supabase
      .from("answers")
      .insert([userInsertions], { returning: "minimal" });

    props.updateQuestion();
    setProgress(progress + 1);
    getSample();
    setLoading(false);
  }

  const getSample = useCallback(() => {
    const keys = Object.keys(fileNames);
    // Select random file
    const randomNumber = (keys.length * Math.random()) << 0;
    setFileNames((current) => {
      const copy = { ...current };
      delete current[randomNumber];
      return copy;
    });
    setSelectedRandomSample(randomNumber);
    setSelectedRandomSampleFilename(
      process.env.NODE_ENV === "production"
        ? `/DM2350${audioFiles[randomNumber]}`
        : audioFiles[randomNumber]
    );
    return audioFiles[keys[randomNumber]];
  }, [fileNames]);

  return (
    <>
      {!loading && (
        <ReactAudioPlayer src={selectedRandomSampleFilename} controls />
      )}
      {loading && <CircularProgress />}
      <br />
      <FormLabel id="demo-radio-buttons-group-label">Preference</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={handleChange}
      >
        {Array.from(Array(5).keys()).map((x) => {
          return (
            <FormControlLabel
              key={x + 1}
              value={x + 1}
              control={<Radio />}
              label={x + 1}
            />
          );
        })}
      </RadioGroup>
      <br />
      <Button onClick={handleClick} variant="contained">
        Next
      </Button>
      <br />
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
