import React, { useState } from 'react';
import { login } from "../utils/apiUtils";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

		const data = await login({ email, password })
    console.log(`Status Code: ${data.status}`)
    if (data.status === 200) {
      onLogin()
    } else {
      alert(data.data)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>로그인</h2>
      <div>
        <label>이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">로그인</button>
    </form>
  );
};

export default Login;
