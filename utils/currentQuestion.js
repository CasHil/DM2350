export function setCurrentQuestionNumberStorage(questionNumber) {
  return window.localStorage.setItem("question_number", questionNumber);
}

export function getCurrentQuestionNumberStorage() {
  if (typeof window === "undefined") {
    return null;
  }
  const currentQuestionNumber = window.localStorage.getItem("question_number");
  return currentQuestionNumber ? parseInt(currentQuestionNumber) : null;
}
