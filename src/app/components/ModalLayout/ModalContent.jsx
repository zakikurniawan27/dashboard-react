import { Box } from "@mui/material";

import Modal from "@mui/material/Modal";

const ModalContent = ({ open, children }) => {
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 570,
            bgcolor: "background.paper",
            borderRadius: "5px",
            boxShadow: 24,
            padding: 2.5,
            overflow: "auto"
          }}
        >
          {children}
        </Box>
      </Modal>
    </>
  );
};

export default ModalContent;
