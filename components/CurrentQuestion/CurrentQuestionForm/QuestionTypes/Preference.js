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
  const [preference, setPreference] = useState(null);
  const [selectedRandomSample, setSelectedRandomSample] = useState();
  const [selectedRandomSampleFilename, setSelectedRandomSampleFilename] =
    useState("");
  const [progress, setProgress] = useState(0);
  const [fileNameKeys, setFileNameKeys] = useState(
    Object.getOwnPropertyNames(audioFiles)
  );
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
    setPreference(null);
    getSample();
    setLoading(false);
  }

  const getSample = useCallback(() => {
    // Select random file
    const randomNumber = (fileNameKeys.length * Math.random()) << 0;
    setFileNameKeys((current) => {
      const copy = [...current];
      return copy.filter((fileNameKey) => fileNameKey != randomNumber);
    });
    setSelectedRandomSample(randomNumber);
    setSelectedRandomSampleFilename(
      process.env.NODE_ENV === "production"
        ? `/DM2350${audioFiles[randomNumber]}`
        : audioFiles[randomNumber]
    );
    console.log(`Random number: ${randomNumber}`);
    console.log(`Random file: ${audioFiles[randomNumber]}`);
    return audioFiles[randomNumber];
  }, []);

  return (
    <>
      {!loading && (
        <ReactAudioPlayer
          src={selectedRandomSampleFilename}
          controls
          style={{ marginBottom: "1rem" }}
        />
      )}
      {loading && <CircularProgress />}
      <FormLabel id="demo-radio-buttons-group-label">Preference</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={handleChange}
        style={{ marginBottom: "1rem" }}
        value={preference}
      >
        {Array.from(Array(5).keys()).map((x) => {
          return (
            <FormControlLabel
              key={x + 1}
              value={x + 1}
              control={<Radio required />}
              label={x + 1}
            />
          );
        })}
      </RadioGroup>
      <Button
        onClick={handleClick}
        variant="contained"
        style={{ marginBottom: "1rem" }}
        disabled={preference === null}
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
