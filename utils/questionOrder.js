import Gender from "../components/CurrentQuestion/CurrentQuestionForm/QuestionTypes/Gender";
import Preference from "../components/CurrentQuestion/CurrentQuestionForm/QuestionTypes/Preference";
import Age from "../components/CurrentQuestion/CurrentQuestionForm/QuestionTypes/Age";
import HoursListened from "../components/CurrentQuestion/CurrentQuestionForm/QuestionTypes/HoursListened";
// export const questionOrder = ["age", "gender", "hoursListened", "preference"];

export function questionOrder(questionNumber, updateQuestion, repetition) {
  return [
    <Age updateQuestion={updateQuestion} />,
    <Gender updateQuestion={updateQuestion} />,
    <HoursListened updateQuestion={updateQuestion} />,
    <Preference updateQuestion={updateQuestion} repetition={repetition} />,
  ][questionNumber];
}
