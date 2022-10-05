export function generateRemainingQuestions() {
  const remainingQuestions = Array.from(Array(25).keys()).map((x) => x + 1);
  setRemainingQuestions(remainingQuestions);
  return remainingQuestions;
}

export function getRemainingQuestions() {
  if (typeof window === "undefined") {
    return null;
  }
  const remainingQuestions = window.localStorage.getItem("remaining_questions");
  if (remainingQuestions) {
    return remainingQuestions.split(",");
  }
  return null;
}

export function setRemainingQuestions(remainingQuestions) {
  localStorage.setItem("remaining_questions", remainingQuestions.toString());
}

export function removeRemainingQuestion(question) {
  const remainingQuestions = getRemainingQuestions();
  if (remainingQuestions) {
    setRemainingQuestions(getRemainingQuestions().filter((q) => q != question));
  }
}
