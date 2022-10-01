import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import ExperimentFinished from "./ExperimentFinished";
import { checkUuid, generateUuid, removeUuid } from "../utils/uuid";
import { checkUser } from "../utils/user";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [userCompletedExperiment, setUserCompletedExperiment] = useState(false);
  async function insertUser() {
    try {
      const personId = generateUuid();

      // Arrange user data to be inserted
      const userInsertions = {
        created_at: new Date(),
        person_id: personId,
      };

      // Insert user data
      await supabase
        .from("users")
        .insert([userInsertions], { returning: "minimal" });

      // Arrange current question data
      const currentUserQuestionInsertions = {
        created_at: new Date(),
        person_id: personId,
        current_question: 1,
        repetition: 1,
      };

      await supabase
        .from("current_user_question")
        .insert([currentUserQuestionInsertions], { returning: "minimal" });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    try {
      setLoading(true);
      if (typeof window !== "undefined") {
        if (!checkUuid()) {
          insertUser();
        } else {
          if (!checkUser()) {
            insertUser();
          } else {
            setUserCompletedExperiment(true);
          }
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // if (userCompletedExperiment) return <ExperimentFinished></ExperimentFinished>;
}
