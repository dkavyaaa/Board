import React from "react";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import TranscriptForm from "../components/TranscriptForm";
import ActionItemList from "../components/ActionItemList";
import ProgressPieChart from "../components/ProgressPieChart";
import { useActionItems } from "../hooks/useActionItems";

const App: React.FC = () => {
  const {
    actionItems,
    loading,
    addActionItems,
    toggleStatus,
    removeItem,
  } = useActionItems();

  const completedCount = actionItems.filter((item) => item.status === "completed").length;
  const pendingCount = actionItems.length - completedCount;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        InsightBoard AI Dashboard
      </Typography>

      <TranscriptForm onSubmit={addActionItems} loading={loading} />

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <ProgressPieChart completed={completedCount} pending={pendingCount} />

          <Typography variant="h6" mt={4} mb={2}>
            Action Items
          </Typography>
          <ActionItemList
            items={actionItems}
            onToggleStatus={toggleStatus}
            onDelete={removeItem}
          />
        </>
      )}
    </Container>
  );
};

export default App;
