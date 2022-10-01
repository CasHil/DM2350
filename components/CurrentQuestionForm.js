import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { genders } from "../utils/genderForm";

export default function CurrentQuestionForm(props) {
  if (props.questionType === "mc") {
    function multipleChoiceAnswers() {
      switch (props.question_number) {
        case 2: {
          genders.map((gender) => {
            return (
              <FormControlLabel
                value={gender}
                control={<Radio />}
                label={gender}
              />
            );
          });
        }
      }
    }
    return (
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
    );
  }
}
