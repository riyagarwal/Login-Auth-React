import { useState } from "react";
import Profile from "../profile/Profile";

import "./Login.css";

const AUTH_URL = "https://dummyjson.com/auth/login";
let showProfile = false;

const LoginUI = () => {
  let [inputData, setInputData] = useState({});

  const login = async () => {
    try {
      // authenticating user
      const response = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: inputData.userName,
          password: inputData.password,
        }),
      });

      const jsonResponse = await response.json();
      console.log(jsonResponse);

      //   storing id and token in local storage
      localStorage.setItem("id", jsonResponse.id);
      localStorage.setItem("token", jsonResponse.token);

      showProfile = true;
    } catch (err) {
      console.log(err);
      document.getElementById("error").textContent = "Invalid Credentials";
    }
  };

  return (
    <>
      <div id="input-boxes">
        <input
          placeholder="Username"
          type="text"
          onChange={(e) => {
            setInputData({
              ...inputData,
              userName: e.target.value,
            });
          }}
        />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => {
            setInputData({
              ...inputData,
              password: e.target.value,
            });
          }}
        />
        <button type="submit" onClick={login}>
          Login
        </button>
        <div id="error"></div>
        <div id="success"></div>
      </div>
      {showProfile && <Profile />}
    </>
  );
};

export default LoginUI;
