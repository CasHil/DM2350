import { supabase } from "./supabaseClient";
import { getUuid, removeUuid } from "./uuid";

export async function checkUser(uuid) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("person_id", uuid);
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
