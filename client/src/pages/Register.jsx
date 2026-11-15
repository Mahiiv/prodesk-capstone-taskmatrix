import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    // backend url comes from the env file, changes when deployed
  var API = import.meta.env.VITE_API_URL;
  // one state for each input box
  var [name, setName] = useState('');
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [message, setMessage] = useState('');
  var navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(); // stops the page from reloading
    setMessage('');

    // sending the form data to my backend
    fetch(API + '/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, password: password })
    }).then(function (res) {
      // res.ok is false when the server sends 400 / 500
      return res.json().then(function (data) {
        if (!res.ok) {
          setMessage(data.message);
          return;
        }
        // saving the token (entry pass) in the browser
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
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={function (e) { setName(e.target.value); }} />
        <br />
        <input type="email" placeholder="Email" value={email} onChange={function (e) { setEmail(e.target.value); }} />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={function (e) { setPassword(e.target.value); }} />
        <br />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;