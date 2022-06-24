import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modalStyles } from "../styles";
import SignUp from "../signup/SignUp";

interface LoginProps {
  open: boolean;
  handleClose: () => void;
}

const Login: React.FC<LoginProps> = ({ open, handleClose }) => {
  const handleSignIn = () => {
    handleClose();
  };

  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleToggleSignIn = () => setIsLogin(!isLogin);

  return (
    <Modal
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box sx={modalStyles}>
        {isLogin ? (
          <React.Fragment>
            <h3 style={{ fontFamily: "Arcade" }}>Please Login to play</h3>
            <input placeholder="email" />
            <input placeholder="password" />
            <button onClick={handleSignIn}>Login</button>
            <br />
          </React.Fragment>
        ) : (
          <SignUp />
        )}

        {isLogin ? (
          <a onClick={handleToggleSignIn}>or sign up</a>
        ) : (
          <a onClick={handleToggleSignIn}>or login</a>
        )}
      </Box>
    </Modal>
  );
};

export default Login;
