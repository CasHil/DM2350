import React, { useState } from "react";
import { genders } from "../../../../utils/genderForm";
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { supabase } from "../../../../utils/supabaseClient";
import { getUuid } from "../../../../utils/uuid";

export default function Gender(props) {
  const [gender, setGender] = useState("male");

  function handleChange(e) {
    setGender(e.target.value);
  }

  async function handleClick() {
    await supabase
      .from("user_information")
      .update({ gender: gender })
      .match({ person_id: getUuid() });

    props.updateQuestion();
  }

  return (
    <>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="male"
        name="radio-buttons-group"
        onChange={handleChange}
        style={{ marginBottom: "1rem" }}
      >
        {Object.entries(genders).map(([key, value]) => {
          return (
            <FormControlLabel
              key={key}
              value={key}
              control={<Radio />}
              label={value}
            />
          );
        })}
      </RadioGroup>
      <Button onClick={handleClick} variant="contained">
        Next
      </Button>
    </>
  );
}
