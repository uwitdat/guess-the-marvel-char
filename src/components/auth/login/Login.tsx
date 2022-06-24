import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

interface LoginProps {
  open: boolean;
  handleClose: () => void;
}

const Login: React.FC<LoginProps> = ({ open, handleClose }) => {
  const handleSignIn = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box sx={style}>
        <h3 style={{ fontFamily: "Arcade" }}>Please Login to play</h3>

        <input placeholder="email" />
        <input placeholder="password" />
        <button onClick={handleSignIn}>Sign In</button>
      </Box>
    </Modal>
  );
};

export default Login;
