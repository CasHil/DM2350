import Gender from "../components/CurrentQuestion/CurrentQuestionForm/QuestionTypes/Gender";
import Age from "../components/CurrentQuestion/CurrentQuestionForm/QuestionTypes/Age";
import HoursListened from "../components/CurrentQuestion/CurrentQuestionForm/QuestionTypes/HoursListened";
import Preferences from "../components/CurrentQuestion/CurrentQuestionForm/QuestionTypes/Preference/Preferences";

export function questionOrder(questionNumber, updateQuestion, repetition) {
  return [
    <Age updateQuestion={updateQuestion} />,
    <Gender updateQuestion={updateQuestion} />,
    <HoursListened updateQuestion={updateQuestion} />,
    <Preferences updateQuestion={updateQuestion} repetition={repetition} />,
  ][questionNumber];
}
