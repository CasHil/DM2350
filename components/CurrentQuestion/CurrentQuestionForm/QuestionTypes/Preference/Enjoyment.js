import React from "react";
import { preferences } from "../../../../../utils/preferenceForm";

export default function Enjoyment(props) {
  return (
    <>
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
