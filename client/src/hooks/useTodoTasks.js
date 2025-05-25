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

  // recarrega todo & done do banco
  const reload = useCallback(async () => {
    if (!userId) return;
    try {
      const all = await fetchTasks(userId);
      setTodo(all.filter((t) => !t.is_done));
      setDone(all.filter((t) => t.is_done));
    } catch (err) {
      console.error("[useTodoTasks] reload:", err);
    }
  }, [userId]);

  // no login / usuário muda
  useEffect(() => {
    reload();
  }, [reload]);

  const addTask = async (label) => {
    try {
      await insertTask(userId, label);
      await reload();
    } catch (err) {
      console.error("[useTodoTasks] addTask:", err);
    }
  };

  const updateTask = async (id, label) => {
    try {
      await updateTaskSupabase(id, { label });
      await reload();
    } catch (err) {
      console.error("[useTodoTasks] updateTask:", err);
    }
  };

  const moveToDone = async (id) => {
    try {
      await updateTaskSupabase(id, { is_done: true });
      await reload();
    } catch (err) {
      console.error("[useTodoTasks] moveToDone:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskSupabase(id);
      await reload();
    } catch (err) {
      console.error("[useTodoTasks] deleteTask:", err);
    }
  };

  const eraseAll = async (type) => {
    try {
      const flag = type === "todo" ? false : true;
      await deleteTasksByStatus(userId, flag);
      await reload();
    } catch (err) {
      console.error("[useTodoTasks] eraseAll:", err);
    }
  };

  const reorderTasks = async (newOrder) => {
    try {
      const updates = newOrder.map((task, idx) => ({
        id: task.id,
        position: idx,
      }));
      await reorderTasksSupabase(updates);
      await reload();
    } catch (err) {
      console.error("[useTodoTasks] reorderTasks:", err);
    }
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
