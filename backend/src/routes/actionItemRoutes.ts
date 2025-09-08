import express from "express";
import {
  generateActionItems,
  getActionItems,
  updateActionItemStatus,
  deleteActionItem,
} from "../controllers/actionItemController";

const router = express.Router();

router.post("/generate-action-items", generateActionItems);
router.get("/action-items", getActionItems);
router.put("/action-items/:id", updateActionItemStatus);
router.delete("/action-items/:id", deleteActionItem);

export default router;
