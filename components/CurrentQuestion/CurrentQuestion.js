import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import {
  getCurrentQuestionNumberStorage,
  setCurrentQuestionNumberStorage,
} from "../../utils/currentQuestion";
import { supabase } from "../../utils/supabaseClient";
import ExperimentFinished from "../ExperimentFinished";
import CurrentQuestionForm from "./CurrentQuestionForm/CurrentQuestionForm";

export default function CurrentQuestion() {
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [currentQuestionRepetition, setCurrentQuestionRepetition] = useState(1);
  const [loading, setLoading] = useState(false);
  function formatQuestion(currQuestion) {
    if (Array.isArray(currQuestion)) {
      return (
        <CurrentQuestionForm
          questionNumber={currentQuestionNumber}
          updateQuestion={updateQuestion}
          repetition={currentQuestionRepetition}
          currentQuestion={currentQuestion}
        ></CurrentQuestionForm>
      );
    }
    return (
      <>
        <h2>{currQuestion.question}</h2>
        <CurrentQuestionForm
          questionNumber={currentQuestionNumber}
          updateQuestion={updateQuestion}
          repetition={currentQuestionRepetition}
          currentQuestion={currentQuestion}
        ></CurrentQuestionForm>
      </>
    );
  }
  function updateQuestion() {
    const q = Array.isArray(currentQuestion)
      ? currentQuestion[0]
      : currentQuestion;
    if (currentQuestionRepetition + 1 > q.repetitions) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
      setCurrentQuestionNumberStorage(currentQuestionNumber + 1);
      setCurrentQuestionRepetition(1);
      getCurrentQuestion();
    } else {
      setCurrentQuestionRepetition(currentQuestionRepetition + 1);
    }
  }
  async function getCurrentQuestion() {
    try {
      setLoading(true);
      if (getCurrentQuestionNumberStorage() < 5) {
        const result = await supabase
          .from("questions")
          .select()
          .eq("question_number", getCurrentQuestionNumberStorage());
        setCurrentQuestion(result.data[0]);
      } else {
        const result = await supabase
          .from("questions")
          .select()
          .or(
            `question_number.eq.${getCurrentQuestionNumberStorage()},question_number.eq.${
              getCurrentQuestionNumberStorage() + 1
            }`
          );
        setCurrentQuestion(result.data);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!getCurrentQuestionNumberStorage()) {
      setCurrentQuestionNumberStorage(1);
      setCurrentQuestionNumber(1);
    } else {
      setCurrentQuestionNumber(getCurrentQuestionNumberStorage());
    }
    if (currentQuestionNumber > 5) return;
  }, []);

  useEffect(() => {
    getCurrentQuestion();
  }, [currentQuestionNumber]);

  if (loading) {
    return <CircularProgress />;
  }
  if (currentQuestionNumber > 5) {
    return <ExperimentFinished />;
  }

  return formatQuestion(currentQuestion);
}
