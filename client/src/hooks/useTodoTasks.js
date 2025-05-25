import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  fetchTasks,
  addTask    as insertTask,
  updateTaskSupabase,
  deleteTaskSupabase,
  deleteTasksByStatus,
  reorderTasksSupabase,
} from "../services/todoService";

export function useTodoTasks() {
  const { session } = useAuth();
  const userId = session?.user.id || null;

  const [todo, setTodo] = useState([]);
  const [done, setDone] = useState([]);

  // Recarrega do banco
  const reload = useCallback(async () => {
    if (!userId) return;
    const all = await fetchTasks(userId);
    setTodo(all.filter((t) => !t.is_done));
    setDone(all.filter((t) => t.is_done));
  }, [userId]);

  useEffect(() => {
    reload();
  }, [reload]);

  const addTask = async (label) => {
    await insertTask(userId, label);
    await reload();
  };

  const updateTask = async (id, label) => {
    await updateTaskSupabase(id, { label });
    await reload();
  };

  const moveToDone = async (id) => {
    await updateTaskSupabase(id, { is_done: true });
    await reload();
  };

  const deleteTask = async (id) => {
    await deleteTaskSupabase(id);
    await reload();
  };

  const eraseAll = async (type) => {
    const flag = type === "todo" ? false : true;
    await deleteTasksByStatus(userId, flag);
    await reload();
  };

  const reorderTasks = async (newOrder) => {
    const updates = newOrder.map((task, idx) => ({
      id: task.id,
      position: idx,
    }));
    await reorderTasksSupabase(updates);
    await reload();
  };

  return {
    todo,
    done,
    addTask,
    updateTask,
    moveToDone,
    deleteTask,
    eraseAll,
    reorderTasks,
  };
}
