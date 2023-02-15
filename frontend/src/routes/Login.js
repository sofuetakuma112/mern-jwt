import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuthContext();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input id="email" name="email" ref={emailRef} />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
          />
        </div>
        <div>
          <button type="submit">ログイン</button>
        </div>
      </form>
      <div>
        ユーザ登録は<Link to="/signup">こちら</Link>
      </div>
    </div>
  );
};

export default Login;
