// CustomModal.js
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
}));

const CustomModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Select LLM
        <CloseButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </CloseButton>
      </DialogTitle>
      <DialogContent>
        <div className="modal-options">
          <Button variant="contained" color="primary" fullWidth>
            LLM 1
          </Button>
          <Button variant="contained" color="primary" fullWidth>
            LLM 2
          </Button>
          <Button variant="contained" color="primary" fullWidth>
            LLM 3
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
