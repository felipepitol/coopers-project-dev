import { supabase } from "../lib/supabase";

export async function fetchTasks(userId) {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId)
    .order("position", { ascending: true })
    .order("inserted_at", { ascending: true });
  if (error) throw error;
  return data;
}

export async function addTask(userId, label) {
  // você pode escolher inicializar position com o timestamp ou com 0
  const { data, error } = await supabase
    .from("todos")
    .insert({ user_id: userId, label, is_done: false, position: 0 })
    .single();
  if (error) throw error;
  return data;
}

export async function updateTaskSupabase(id, updates) {
  const { data, error } = await supabase
    .from("todos")
    .update(updates)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTaskSupabase(id) {
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw error;
}

export async function deleteTasksByStatus(userId, isDone) {
  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("user_id", userId)
    .eq("is_done", isDone);
  if (error) throw error;
}

export async function reorderTasksSupabase(tasks) {
  await Promise.all(
    tasks.map(({ id, position }) =>
      supabase.from("todos").update({ position }).eq("id", id)
    )
  );
}
