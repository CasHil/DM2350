import React from "react";
import { preferences } from "../../../../../utils/preferenceForm";
import { FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

export default function Enjoyment(props) {
  return (
    <>
      <h2>{props.question.question}</h2>
      <FormLabel id="demo-radio-buttons-group-label">Preference</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={props.handleChange}
        style={{ marginBottom: "1rem" }}
        value={props.preference}
      >
        {Object.entries(preferences).map(([key, value]) => {
          return (
            <FormControlLabel
              key={`preference-${key}`}
              value={key}
              control={<Radio required />}
              label={value}
            />
          );
        })}
      </RadioGroup>
    </>
  );
}
