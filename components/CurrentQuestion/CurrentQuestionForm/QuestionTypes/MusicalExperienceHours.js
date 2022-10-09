import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { getUuid } from "../../../../utils/uuid";
import { supabase } from "../../../../utils/supabaseClient";

export default function MusicalExperienceHours(props) {
  const [musicalExperienceHours, setMusicalExperienceHours] = useState(null);

  async function handleClick() {
    await supabase
      .from("user_information")
      .update({ musical_experience_hours: musicalExperienceHours })
      .match({ person_id: getUuid() });

    props.updateQuestion();
  }

  function handleChange(e) {
    setMusicalExperienceHours(e.target.value);
  }

  return (
    <>
      <TextField
        required
        id="musical_experience_hours"
        label="Hours"
        variant="outlined"
        onChange={handleChange}
        style={{ marginBottom: "1rem" }}
      />
      <Button
        onClick={handleClick}
        variant="contained"
        disabled={musicalExperienceHours === null}
      >
        Next
      </Button>
    </>
  );
}
