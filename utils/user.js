import { supabase } from "./supabaseClient";
import { getUuid } from "./uuid";

export async function checkUser() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("person_id", getUuid());
    if (error) throw error;
    if (data.length === 0) {
      removeUuid();
      return false;
    }
    return true;
  } catch (err) {
    console.error(err);
  }
}
