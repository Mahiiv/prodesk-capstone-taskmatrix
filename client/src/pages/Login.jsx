import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
var API = import.meta.env.VITE_API_URL;

function Login() {
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [message, setMessage] = useState('');
  var navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(); // stops the page from reloading
    setMessage('');

    // sending email + password to the backend
     fetch(API + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    }).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok) {
          setMessage(data.message);
          return;
        }
        // same as register, saving the token in the browser
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      });
    }).catch(function () {
      setMessage('could not reach the server');
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={function (e) { setEmail(e.target.value); }} />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={function (e) { setPassword(e.target.value); }} />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;