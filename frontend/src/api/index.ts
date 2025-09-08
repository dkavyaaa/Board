import axios from "axios";

export interface ActionItem {
  id: number;
  text: string;
  status: "pending" | "completed";
}

export const fetchActionItems = async (): Promise<ActionItem[]> => {
  const res = await axios.get("/api/action-items");
  return res.data.actionItems;
};

export const generateActionItems = async (transcript: string): Promise<ActionItem[]> => {
  const res = await axios.post("/api/generate-action-items", { transcript });
  return res.data.actionItems;
};

export const updateActionItemStatus = async (id: number, status: "pending" | "completed"): Promise<ActionItem> => {
  const res = await axios.put(`/api/action-items/${id}`, { status });
  return res.data.actionItem;
};

export const deleteActionItem = async (id: number): Promise<void> => {
  await axios.delete(`/api/action-items/${id}`);
};
