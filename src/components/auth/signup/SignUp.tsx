import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import axios from "axios";

const API_URI = process.env.REACT_APP_API_URL;

interface NewUserObj {
  email: string;
  password: string;
  userName: string;
}

const SignUp: React.FC = () => {
  const [newUser, setNewUser] = useState<NewUserObj>({
    email: "",
    password: "",
    userName: "",
  });

  const handleUpdateValues = (e: any) => {
    const { name, value } = e.target;

    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleUserSignUp = async () => {
    const { email, password } = newUser;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("FROM AXioS", user);
        createNewUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const createNewUser = async (user: any) => {
    const values = {
      email: user.email,
      userName: newUser.userName,
    };
    const { data } = await axios.post(`${API_URI}/users/new-user`, values);
    if (data.success) {
      console.log("success", data.data);
    } else {
      console.log("error", data.errorMessage);
    }
  };

  return (
    <div>
      {" "}
      <h3 style={{ fontFamily: "Arcade" }}>Please signup to play</h3>
      <input onChange={handleUpdateValues} placeholder="email" name="email" />
      <input
        type="password"
        onChange={handleUpdateValues}
        placeholder="password"
        name="password"
      />
      <input
        onChange={handleUpdateValues}
        placeholder="username"
        name="userName"
      />
      <button onClick={handleUserSignUp}>Sign up</button>
      <br />
    </div>
  );
};

export default SignUp;
