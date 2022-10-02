import React, { useState } from "react";
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { supabase } from "../../../../utils/supabaseClient";
import { checkUuid } from "../../../../utils/uuid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

export default function Preference(props) {
  const [preference, setPreference] = useState(1);
  const [progress, setProgress] = useState(0);

  function handleChange(e) {
    setPreference(e.target.value);
  }

  async function handleClick() {
    const userInsertions = {
      created_at: new Date(),
      person_id: checkUuid(),
      answer: preference,
      question_number: props.repetition,
    };

    await supabase
      .from("answers")
      .insert([userInsertions], { returning: "minimal" });

    console.log(props.updateQuestion);
    props.updateQuestion();
    setProgress(progress + 1);
  }

  return (
    <>
      <FormLabel id="demo-radio-buttons-group-label">Preference</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="male"
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
      <LinearProgress variant="determinate" {...props} />
      <Typography variant="body2" color="text.secondary">{`${Math.round(
        (progress / 25) * 100
      )}%`}</Typography>
    </>
  );
}
