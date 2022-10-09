import React from "react";
import { FormControl } from "@mui/material";
import { questionOrder } from "../../../utils/questionOrder";

export default function CurrentQuestionForm(props) {
  function questionAnswers() {
    return questionOrder(
      props.questionNumber - 1,
      props.updateQuestion,
      props.repetition,
      props.currentQuestion
    );
  }
  return (
    <FormControl style={{ margin: "auto", minWidth: "33%" }}>
      {questionAnswers()}
    </FormControl>
  );
}
