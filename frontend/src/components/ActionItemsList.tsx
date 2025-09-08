import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ActionItem } from "../api";

interface ActionItemListProps {
  items: ActionItem[];
  onToggleStatus: (id: number) => void;
  onDelete: (id: number) => void;
}

const ActionItemList: React.FC<ActionItemListProps> = ({
  items,
  onToggleStatus,
  onDelete,
}) => {
  return (
    <List>
      {items.map((item) => (
        <ListItem
          key={item.id}
          secondaryAction={
            <IconButton edge="end" onClick={() => onDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
          }
          disablePadding
        >
          <Checkbox
            checked={item.status === "completed"}
            onChange={() => onToggleStatus(item.id)}
          />
          <ListItemText
            primary={item.text}
            sx={{
              textDecoration:
                item.status === "completed" ? "line-through" : "none",
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ActionItemList;
