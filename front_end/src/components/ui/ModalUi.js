import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  //   border: "2px solid #000",

  p: 4,
};
const ModalUi = ({ width, bg, children, open, setOpen }) => {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={setOpen ? handleClose : null}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            boxShadow: bg ? "none" : 24,
            outline: bg ? "none" : "",
            bgcolor: bg ? "none" : "background.paper",
            width: width,
          }}
        >
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalUi;
