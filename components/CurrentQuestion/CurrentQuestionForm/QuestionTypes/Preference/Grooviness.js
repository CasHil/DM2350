import React from "react";
import { grooviness } from "../../../../../utils/groovinessForm";

export default function Grooviness(props) {
  return (
    <>
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
              key={key}
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
