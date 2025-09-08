import { useState, useEffect } from "react";
import {
  ActionItem,
  fetchActionItems,
  generateActionItems,
  updateActionItemStatus,
  deleteActionItem,
} from "../api";

export const useActionItems = () => {
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadActionItems = async () => {
    try {
      const items = await fetchActionItems();
      setActionItems(items);
    } catch {
      alert("Failed to fetch action items");
    }
  };

  useEffect(() => {
    loadActionItems();
  }, []);

  const addActionItems = async (transcript: string) => {
    setLoading(true);
    try {
      const newItems = await generateActionItems(transcript);
      setActionItems(newItems);
    } catch {
      alert("Failed to generate action items");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: number) => {
    const item = actionItems.find((item) => item.id === id);
    if (!item) return;
    const newStatus = item.status === "pending" ? "completed" : "pending";
    try {
      const updated = await updateActionItemStatus(id, newStatus);
      setActionItems((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );
    } catch {
      alert("Failed to update status");
    }
  };

  const removeItem = async (id: number) => {
    try {
      await deleteActionItem(id);
      setActionItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Failed to delete item");
    }
  };

  return {
    actionItems,
    loading,
    addActionItems,
    toggleStatus,
    removeItem,
  };
};
