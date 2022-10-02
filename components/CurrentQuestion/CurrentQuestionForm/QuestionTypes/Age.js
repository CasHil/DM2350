import React from "react";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { getUuid } from "../../../../utils/uuid";
import { supabase } from "../../../../utils/supabaseClient";

export default function Age(props) {
  const [age, setAge] = useState(0);

  async function handleClick() {
    // Arrange user data to be inserted
    const userInsertions = {
      created_at: new Date(),
      person_id: getUuid(),
      age: age,
      gender: 0,
      hours_listened: 0,
    };

    await supabase
      .from("user_information")
      .insert([userInsertions], { returning: "minimal" });

    props.updateQuestion();
  }

  function handleChange(e) {
    setAge(e.target.value);
  }

  return (
    <>
      <TextField
        id="age"
        label="Age"
        variant="outlined"
        onChange={handleChange}
      />
      <br></br>
      <Button onClick={handleClick} variant="contained">
        Next
      </Button>
    </>
  );
}
