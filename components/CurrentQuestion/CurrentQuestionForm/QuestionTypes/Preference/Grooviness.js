import React from "react";
import { grooviness } from "../../../../../utils/groovinessForm";
import { FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

export default function Grooviness(props) {
  return (
    <>
      <h2>{props.question.question}</h2>
      <FormLabel id="demo-radio-buttons-group-label">Grooviness</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={props.handleChange}
        style={{ marginBottom: "1rem" }}
        value={props.preference}
      >
        {Object.entries(grooviness).map(([key, value]) => {
          return (
            <FormControlLabel
              key={`grooviness-${key}`}
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
