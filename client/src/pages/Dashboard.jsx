import { useNavigate } from 'react-router-dom';
import Tasks from "../Tasks";

function Dashboard() {
  var navigate = useNavigate();

  // getting the user we saved at login/register
  var savedUser = localStorage.getItem('user');
  var user = savedUser ? JSON.parse(savedUser) : null;

  function handleLogout() {
    // removing the token = logged out
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user ? user.name : 'guest'}</p>
      <p>Email: {user ? user.email : ''}</p>
      <button onClick={handleLogout}>Logout</button>
      <Tasks />
    </div>
  );
}

export default Dashboard;