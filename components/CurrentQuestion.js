import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { checkUuid } from "../utils/uuid";
import CurrentQuestionForm from "./CurrentQuestionForm";

export default function CurrentQuestion() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  useEffect(() => {
    // Current question the user is on
    let currentQuestion = 1;
    // Amount of times the current question should be repeated
    let repetitions = 1;

    async function getCurrentQuestion() {
      const result = await supabase
        .from("questions")
        .select()
        .eq("question_number", currentQuestion);

      // console.log(result.data[0]);

      setCurrentQuestion(result.data[0]);
    }
    getCurrentQuestion();
  }, []);
  return (
    <>
      <h2>{currentQuestion.question}</h2>
      <CurrentQuestionForm></CurrentQuestionForm>
    </>
  );
}
