import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { getUuid } from "../../../../utils/uuid";
import { supabase } from "../../../../utils/supabaseClient";

export default function MusicalExperience(props) {
  const [musicalExperience, setMusicalExperience] = useState(null);

  async function handleClick() {
    await supabase
      .from("user_information")
      .update({ musical_experience: musicalExperience })
      .match({ person_id: getUuid() });

    props.updateQuestion();
  }

  function handleChange(e) {
    setMusicalExperience(e.target.value);
  }

  return (
    <>
      <TextField
        required
        id="musical_experience"
        label="Years"
        variant="outlined"
        onChange={handleChange}
        style={{ marginBottom: "1rem" }}
      />
      <Button
        onClick={handleClick}
        variant="contained"
        disabled={musicalExperience === null}
      >
        Next
      </Button>
    </>
  );
}
