import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modalStyles } from "../styles";
import SignUp from "../signup/SignUp";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginProps {
  open: boolean;
}

interface UserObj {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ open }) => {
  const [user, setUser] = useState<UserObj>({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    const { email, password } = user;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.log("err", err.message);
    }
  };

  const handleUpdateValues = (e: any) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
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
            <input
              placeholder="email"
              name="email"
              onChange={handleUpdateValues}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleUpdateValues}
            />
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
