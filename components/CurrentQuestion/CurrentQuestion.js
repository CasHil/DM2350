import { useState, useEffect } from "react";
import {
  getCurrentQuestionNumberStorage,
  setCurrentQuestionNumberStorage,
} from "../../utils/currentQuestion";
import { supabase } from "../../utils/supabaseClient";
import ExperimentFinished from "../ExperimentFinished";
import CurrentQuestionForm from "./CurrentQuestionForm/CurrentQuestionForm";

export default function CurrentQuestion() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [currentQuestionRepetition, setCurrentQuestionRepetition] = useState(1);

  function updateQuestion() {
    if (currentQuestionRepetition + 1 > currentQuestion.repetitions) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
      setCurrentQuestionNumberStorage(currentQuestionNumber + 1);
      setCurrentQuestionRepetition(1);
    } else {
      setCurrentQuestionRepetition(currentQuestionRepetition + 1);
    }
  }
  useEffect(() => {
    async function getCurrentQuestion() {
      try {
        const result = await supabase
          .from("questions")
          .select()
          .eq("question_number", currentQuestionNumber);

        setCurrentQuestion(result.data[0]);
      } catch (err) {
        console.error(err);
      }
    }
    getCurrentQuestion();
  }, [currentQuestionNumber]);

  useEffect(() => {
    if (!getCurrentQuestionNumberStorage()) {
      setCurrentQuestionNumberStorage(1);
      setCurrentQuestionNumber(1);
    } else {
      setCurrentQuestionNumber(getCurrentQuestionNumberStorage());
    }
  }, []);
  return (
    <>
      {currentQuestionNumber > 4 ? (
        <ExperimentFinished />
      ) : (
        <>
          <h2>{currentQuestion.question}</h2>
          <CurrentQuestionForm
            questionNumber={currentQuestionNumber}
            updateQuestion={updateQuestion}
            repetition={currentQuestionRepetition}
          ></CurrentQuestionForm>
        </>
      )}
    </>
  );
}
