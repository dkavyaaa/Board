import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

interface TranscriptFormProps {
  onSubmit: (transcript: string) => void;
  loading: boolean;
}

const TranscriptForm: React.FC<TranscriptFormProps> = ({ onSubmit, loading }) => {
  const [transcript, setTranscript] = useState("");

  const handleSubmit = () => {
    if (transcript.trim()) {
      onSubmit(transcript);
      setTranscript("");
    }
  };

  return (
    <Box mb={4}>
      <TextField
        label="Meeting Transcript"
        multiline
        rows={6}
        fullWidth
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        Generate Action Items
      </Button>
    </Box>
  );
};

export default TranscriptForm;
