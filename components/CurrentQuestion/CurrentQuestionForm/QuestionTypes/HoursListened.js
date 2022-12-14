import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { getUuid } from "../../../../utils/uuid";
import { supabase } from "../../../../utils/supabaseClient";

export default function HoursListened(props) {
  const [hoursListened, setHoursListened] = useState(null);

  async function handleClick() {
    await supabase
      .from("user_information")
      .update({ hours_listened: hoursListened })
      .match({ person_id: getUuid() });

    props.updateQuestion();
  }

  function handleChange(e) {
    setHoursListened(e.target.value);
  }

  return (
    <>
      <TextField
        required
        id="hours_listened"
        label="Hours"
        variant="outlined"
        onChange={handleChange}
        style={{ marginBottom: "1rem" }}
      />
      <Button
        onClick={handleClick}
        variant="contained"
        disabled={hoursListened === null}
      >
        Next
      </Button>
    </>
  );
}
